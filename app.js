console.log("app.js is connected to index.html, program running...");

document.getElementById('loan-form').addEventListener('submit', function(event)
{
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 1000);

  event.preventDefault();
});

function calculateResults()
{
  console.log("calculating...");

  //grab everything from the UI
  const amount         = document.getElementById('amount');
  const interest       = document.getElementById('interest');
  const years          = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  var totalPayment     = document.getElementById('total-payment');
  var totalInterest    = document.getElementById('total-interest');

  var principle          = parseFloat(amount.value);
  var calculatedInterest = parseFloat(interest.value) / 100 / 12;
  var calculatedPayments = parseFloat(years.value) * 12;

  var p       = Math.pow(1 + calculatedInterest, calculatedPayments);
  var monthly = (principle * p * calculatedInterest) / (p-1);

  if(principle <= 0 || calculatedInterest <= 0 || calculatedPayments <= 0)
  {
    showError('You can not enter negative values');
    return;
  }

  if(isFinite(monthly))
  {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value   = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value  = ( (monthly * calculatedPayments) - principle ).toFixed(2);

    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
  }
  else
  {
    showError('Please check the numbers you have submitted...');
  }

}

function showError(error)
{
  const errorDiv = document.createElement('div');

  const card    = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv, heading);

  document.getElementById('loading').style.display = 'none';
  document.getElementById('results').style.display = 'none';
  setTimeout(clearError, 2000);
}

function clearError()
{
  document.querySelector('.alert').remove();
  document.querySelector('.results').remove();
}
