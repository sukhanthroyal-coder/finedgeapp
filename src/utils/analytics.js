const transactionModel = require('../models/transactionModel');
const userModel = require('../models/userModel');

/**
 * Calculate financial summary for a user
 * @param {string|number} userId - User ID
 * @param {string} startDate - Optional start date filter (ISO string)
 * @param {string} endDate - Optional end date filter (ISO string)
 * @returns {Promise<Object>} Financial summary object
 */
const calculateUserSummary = async (userId, startDate = null, endDate = null) => {
  let transactions = await transactionModel.findByUserId(userId);
  
  // Filter by date range if provided
  if (startDate || endDate) {
    transactions = transactions.filter(tx => {
      const txDate = new Date(tx.date);
      if (startDate && txDate < new Date(startDate)) return false;
      if (endDate && txDate > new Date(endDate)) return false;
      return true;
    });
  }
  
  let totalIncome = 0;
  let totalExpense = 0;
  const categoryBreakdown = {};
  const monthlyBreakdown = {};
  
  transactions.forEach(tx => {
    const amount = Number(tx.amount) || 0;
    
    if (tx.type === 'income') {
      totalIncome += amount;
    } else if (tx.type === 'expense') {
      totalExpense += amount;
      
      // Category breakdown
      const category = tx.category || 'uncategorized';
      if (!categoryBreakdown[category]) {
        categoryBreakdown[category] = { count: 0, total: 0 };
      }
      categoryBreakdown[category].count += 1;
      categoryBreakdown[category].total += amount;
    }
    
    // Monthly breakdown
    const txDate = new Date(tx.date);
    const monthKey = `${txDate.getFullYear()}-${String(txDate.getMonth() + 1).padStart(2, '0')}`;
    if (!monthlyBreakdown[monthKey]) {
      monthlyBreakdown[monthKey] = { income: 0, expense: 0, count: 0 };
    }
    monthlyBreakdown[monthKey].count += 1;
    if (tx.type === 'income') {
      monthlyBreakdown[monthKey].income += amount;
    } else {
      monthlyBreakdown[monthKey].expense += amount;
    }
  });
  
  const balance = totalIncome - totalExpense;
  
  // Find top spending category
  const topCategory = Object.entries(categoryBreakdown)
    .sort((a, b) => b[1].total - a[1].total)[0];
  
  return {
    userId: Number(userId),
    period: {
      startDate: startDate || null,
      endDate: endDate || null
    },
    summary: {
      totalIncome,
      totalExpense,
      balance,
      transactionCount: transactions.length,
      incomeCount: transactions.filter(t => t.type === 'income').length,
      expenseCount: transactions.filter(t => t.type === 'expense').length
    },
    categoryBreakdown,
    monthlyBreakdown,
    topSpendingCategory: topCategory ? {
      category: topCategory[0],
      amount: topCategory[1].total,
      count: topCategory[1].count
    } : null
  };
};

/**
 * Get transaction statistics with filters
 * @param {Object} filters - Filter options
 * @param {string|number} filters.userId - Optional user ID filter
 * @param {string} filters.startDate - Optional start date filter
 * @param {string} filters.endDate - Optional end date filter
 * @param {string} filters.category - Optional category filter
 * @param {string} filters.type - Optional type filter (income/expense)
 * @returns {Promise<Object>} Statistics object
 */
const getTransactionStats = async (filters = {}) => {
  let transactions = await transactionModel.findAll();
  
  // Apply filters
  if (filters.userId) {
    transactions = transactions.filter(t => String(t.userId) === String(filters.userId));
  }
  
  if (filters.startDate || filters.endDate) {
    transactions = transactions.filter(tx => {
      const txDate = new Date(tx.date);
      if (filters.startDate && txDate < new Date(filters.startDate)) return false;
      if (filters.endDate && txDate > new Date(filters.endDate)) return false;
      return true;
    });
  }
  
  if (filters.category) {
    transactions = transactions.filter(t => t.category === filters.category);
  }
  
  if (filters.type) {
    transactions = transactions.filter(t => t.type === filters.type);
  }
  
  // Calculate statistics
  const stats = {
    totalTransactions: transactions.length,
    totalAmount: 0,
    totalIncome: 0,
    totalExpense: 0,
    averageTransactionAmount: 0,
    byCategory: {},
    byType: {
      income: { count: 0, total: 0 },
      expense: { count: 0, total: 0 }
    },
    dateRange: {
      earliest: null,
      latest: null
    }
  };
  
  if (transactions.length > 0) {
    const dates = transactions.map(t => new Date(t.date)).sort((a, b) => a - b);
    stats.dateRange.earliest = dates[0].toISOString();
    stats.dateRange.latest = dates[dates.length - 1].toISOString();
  }
  
  transactions.forEach(tx => {
    const amount = Number(tx.amount) || 0;
    stats.totalAmount += amount;
    
    if (tx.type === 'income') {
      stats.totalIncome += amount;
      stats.byType.income.count += 1;
      stats.byType.income.total += amount;
    } else if (tx.type === 'expense') {
      stats.totalExpense += amount;
      stats.byType.expense.count += 1;
      stats.byType.expense.total += amount;
    }
    
    // Category breakdown
    const category = tx.category || 'uncategorized';
    if (!stats.byCategory[category]) {
      stats.byCategory[category] = {
        count: 0,
        total: 0,
        income: 0,
        expense: 0
      };
    }
    stats.byCategory[category].count += 1;
    stats.byCategory[category].total += amount;
    if (tx.type === 'income') {
      stats.byCategory[category].income += amount;
    } else {
      stats.byCategory[category].expense += amount;
    }
  });
  
  stats.averageTransactionAmount = stats.totalTransactions > 0 
    ? stats.totalAmount / stats.totalTransactions 
    : 0;
  
  return stats;
};

/**
 * Generate spending insights for a user
 * @param {string|number} userId - User ID
 * @param {string} startDate - Optional start date filter
 * @param {string} endDate - Optional end date filter
 * @returns {Promise<Object>} Insights object
 */
const generateSpendingInsights = async (userId, startDate = null, endDate = null) => {
  const summary = await calculateUserSummary(userId, startDate, endDate);
  const transactions = await transactionModel.findByUserId(userId);
  
  // Filter transactions by date if needed
  let filteredTransactions = transactions;
  if (startDate || endDate) {
    filteredTransactions = transactions.filter(tx => {
      const txDate = new Date(tx.date);
      if (startDate && txDate < new Date(startDate)) return false;
      if (endDate && txDate > new Date(endDate)) return false;
      return true;
    });
  }
  
  const insights = [];
  const recommendations = [];
  
  // Balance insights
  if (summary.summary.balance < 0) {
    insights.push({
      type: 'warning',
      message: `Your expenses exceed your income by $${Math.abs(summary.summary.balance).toFixed(2)}. Consider reducing discretionary spending.`
    });
    recommendations.push('Review and reduce expenses in non-essential categories');
  } else if (summary.summary.balance > 0) {
    insights.push({
      type: 'success',
      message: `Great! You have a positive balance of $${summary.summary.balance.toFixed(2)}.`
    });
  } else {
    insights.push({
      type: 'info',
      message: 'Your income and expenses are balanced.'
    });
  }
  
  // Top spending category insight
  if (summary.topSpendingCategory) {
    const topCategory = summary.topSpendingCategory;
    const categoryPercentage = (topCategory.amount / summary.summary.totalExpense * 100).toFixed(1);
    insights.push({
      type: 'info',
      message: `Your top spending category is '${topCategory.category}' with $${topCategory.amount.toFixed(2)} (${categoryPercentage}% of total expenses).`
    });
  }
  
  // Monthly trend analysis
  const monthlyData = Object.entries(summary.monthlyBreakdown)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-3); // Last 3 months
  
  if (monthlyData.length >= 2) {
    const recentMonth = monthlyData[monthlyData.length - 1];
    const previousMonth = monthlyData[monthlyData.length - 2];
    
    const expenseChange = recentMonth[1].expense - previousMonth[1].expense;
    const expenseChangePercent = previousMonth[1].expense > 0 
      ? ((expenseChange / previousMonth[1].expense) * 100).toFixed(1)
      : 0;
    
    if (expenseChange > 0) {
      insights.push({
        type: 'warning',
        message: `Your expenses increased by $${expenseChange.toFixed(2)} (${expenseChangePercent}%) compared to the previous month.`
      });
    } else if (expenseChange < 0) {
      insights.push({
        type: 'success',
        message: `Great! Your expenses decreased by $${Math.abs(expenseChange).toFixed(2)} (${Math.abs(expenseChangePercent)}%) compared to the previous month.`
      });
    }
  }
  
  // Transaction frequency insight
  const avgTransactionsPerMonth = summary.summary.transactionCount / Math.max(monthlyData.length, 1);
  if (avgTransactionsPerMonth > 50) {
    insights.push({
      type: 'info',
      message: `You have an average of ${avgTransactionsPerMonth.toFixed(1)} transactions per month. Consider reviewing smaller transactions.`
    });
  }
  
  // Savings rate
  if (summary.summary.totalIncome > 0) {
    const savingsRate = (summary.summary.balance / summary.summary.totalIncome * 100).toFixed(1);
    if (parseFloat(savingsRate) >= 20) {
      insights.push({
        type: 'success',
        message: `Excellent savings rate of ${savingsRate}%!`
      });
    } else if (parseFloat(savingsRate) < 0) {
      recommendations.push('Focus on increasing income or reducing expenses to achieve positive savings');
    } else {
      insights.push({
        type: 'info',
        message: `Your savings rate is ${savingsRate}%. Consider aiming for at least 20% for better financial health.`
      });
    }
  }
  
  return {
    userId: Number(userId),
    period: {
      startDate: startDate || null,
      endDate: endDate || null
    },
    summary: summary.summary,
    insights,
    recommendations,
    topCategories: Object.entries(summary.categoryBreakdown)
      .sort((a, b) => b[1].total - a[1].total)
      .slice(0, 5)
      .map(([category, data]) => ({
        category,
        amount: data.total,
        count: data.count,
        percentage: summary.summary.totalExpense > 0 
          ? ((data.total / summary.summary.totalExpense) * 100).toFixed(1) 
          : 0
      }))
  };
};

/**
 * Get category-wise breakdown for a user
 * @param {string|number} userId - User ID
 * @param {string} startDate - Optional start date filter
 * @param {string} endDate - Optional end date filter
 * @returns {Promise<Object>} Category breakdown object
 */
const getCategoryBreakdown = async (userId, startDate = null, endDate = null) => {
  const summary = await calculateUserSummary(userId, startDate, endDate);
  
  const categories = Object.entries(summary.categoryBreakdown)
    .map(([category, data]) => ({
      category,
      totalAmount: data.total,
      transactionCount: data.count,
      percentage: summary.summary.totalExpense > 0
        ? ((data.total / summary.summary.totalExpense) * 100).toFixed(2)
        : 0,
      averageAmount: data.count > 0 ? (data.total / data.count).toFixed(2) : 0
    }))
    .sort((a, b) => b.totalAmount - a.totalAmount);
  
  return {
    userId: Number(userId),
    period: {
      startDate: startDate || null,
      endDate: endDate || null
    },
    totalExpense: summary.summary.totalExpense,
    categories,
    categoryCount: categories.length
  };
};

module.exports = {
  calculateUserSummary,
  getTransactionStats,
  generateSpendingInsights,
  getCategoryBreakdown
};
