// Get the calculate button
const calculateButton = document.getElementById('calculate');

// Add click event listener to the calculate button
calculateButton.addEventListener('click', function() {
  // Get the input values
  const investmentAmount = parseFloat(document.getElementById('investment-amount').value.replace(',', '.'));
  const investmentTerm = parseInt(document.getElementById('investment-term').value);
  const periodType = document.getElementById('period-type').value;
  const diRate = parseFloat(document.getElementById('di-rate').value);
  const selicRate = parseFloat(document.getElementById('selic-rate').value);
  const cdbRate = parseFloat(document.getElementById('cdb-rate').value);
  const lciRate = parseFloat(document.getElementById('lci-rate').value);

  // Calculate the results for each investment type
  const savingsResults = calculateSavings(investmentAmount, investmentTerm, periodType, diRate);
  const cdbResults = calculateCdb(investmentAmount, investmentTerm, periodType, diRate, selicRate);
  const lciResults = calculateLci(investmentAmount, investmentTerm, periodType, selicRate);

  // Display the results
  displayResults(savingsResults, 'savings-result');
  displayResults(cdbResults, 'cdb-result');
  displayResults(lciResults, 'lci-result');
});

// Function to calculate savings investment
function calculateSavings(investmentAmount, investmentTerm, periodType, diRate) {
  const months = periodType === 'days' ? investmentTerm / 30 : periodType === 'months' ? investmentTerm : investmentTerm * 12;
  const interest = (investmentAmount * diRate * months) / 100;
  const total = investmentAmount + interest;

  return {
    investmentType: 'Poupança',
    investmentAmount: investmentAmount.toFixed(2),
    interest: interest.toFixed(2),
    total: total.toFixed(2)
  };
}

// Function to calculate CDB/RDB/LC investment
function calculateCdb(investmentAmount, investmentTerm, periodType, diRate, selicRate) {
  const months = periodType === 'days' ? investmentTerm / 30 : periodType === 'months' ? investmentTerm : investmentTerm * 12;
  const diInterest = (investmentAmount * diRate * months) / 100;
  const selicInterest = (investmentAmount * selicRate * months) / 100;
  const totalDiInterest = diInterest * (cdbRate / 100);
  const totalInterest = totalDiInterest + selicInterest;
  const total = investmentAmount + totalInterest;
  const ir = totalInterest * 0.15;
  const netTotal = total - ir;

  return {
    investmentType: 'CDB/RDB',
    investmentAmount: investmentAmount.toFixed(2),
    diInterest: diInterest.toFixed(2),
    selicInterest: selicInterest.toFixed(2),
    totalDiInterest: totalDiInterest.toFixed(2),
    totalInterest: totalInterest.toFixed(2),
    total: total.toFixed(2),
    ir: ir.toFixed(2),
    netTotal: netTotal.toFixed(2)
  };
}

// Function to calculate LCI/LCA investment
function calculateLci(investmentAmount, investmentTerm, periodType, selicRate) {
  const months = periodType === 'days' ? investmentTerm / 30 : periodType === 'months' ? investmentTerm : investmentTerm * 12;
  const selicInterest = (investmentAmount * selicRate * months) / 100;
  const total = investmentAmount + selicInterest;

  return {
    investmentType: 'LCI/LCA',
    investmentAmount: investmentAmount.toFixed(2),
    selicInterest: selicInterest.toFixed(2),
    total: total.toFixed(2)
  };
}

// Function to display the results
function displayResults(results, resultId) {
  const resultElement = document.getElementById(resultId);
  resultElement.innerHTML = `
    <h2>${results.investmentType}</h2>
    <p>Valor Investido: R$ ${results.investmentAmount}</p>
    <p>Rendimento Bruto: R$ ${results.interest}</p>
    ${results.ir > 0 ? `<p>Imposto de Renda: R$ ${results.ir} (15%)</p>` : ''}
    <p>Valor Total Líquido: R$ ${results.netTotal || results.total}</p>
  `;
}