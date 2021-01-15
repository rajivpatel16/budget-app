// Expense Summary 

 const expenseSummary = (expenses) => {
     let amount = 0;
     const totalCount = expenses.length;
     expenses.forEach(element => {
        amount +=parseFloat(element.amount, 10) / 100
    });
    return {amount, totalCount};
}

export default expenseSummary;
