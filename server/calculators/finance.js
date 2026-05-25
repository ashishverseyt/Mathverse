/**
 * Finance Calculator Module
 * Supports: loans, investments, depreciation, NPV, IRR, etc.
 */

class FinanceCalculator {
  /**
   * Simple Interest
   * @param {number} principal - Principal amount
   * @param {number} rate - Annual interest rate (as decimal, e.g., 0.05 for 5%)
   * @param {number} time - Time in years
   */
  static simpleInterest(principal, rate, time) {
    const interest = principal * rate * time;
    const amount = principal + interest;
    const steps = [
      'Simple Interest:',
      `Principal: ${principal}`,
      `Rate: ${(rate * 100).toFixed(2)}% per year`,
      `Time: ${time} years`,
      `Interest = P × R × T = ${principal} × ${rate} × ${time} = ${interest.toFixed(2)}`,
      `Total Amount = ${amount.toFixed(2)}`
    ];
    return { result: amount, interest, steps };
  }

  /**
   * Compound Interest
   * @param {number} principal - Principal amount
   * @param {number} rate - Annual interest rate (as decimal)
   * @param {number} time - Time in years
   * @param {number} compounds - Compounding frequency per year (1=annually, 4=quarterly, 12=monthly, 365=daily)
   */
  static compoundInterest(principal, rate, time, compounds = 1) {
    const amount = principal * Math.pow(1 + rate / compounds, compounds * time);
    const interest = amount - principal;
    const compoundFreq = {
      1: 'annually',
      2: 'semi-annually',
      4: 'quarterly',
      12: 'monthly',
      365: 'daily'
    };
    const steps = [
      'Compound Interest:',
      `Principal: ${principal}`,
      `Rate: ${(rate * 100).toFixed(2)}% per year`,
      `Time: ${time} years`,
      `Compounding: ${compoundFreq[compounds] || `${compounds}x per year`}`,
      `A = P(1 + r/n)^(nt) = ${principal}(1 + ${rate}/${compounds})^(${compounds}×${time})`,
      `Total Amount = ${amount.toFixed(2)}`,
      `Interest Earned = ${interest.toFixed(2)}`
    ];
    return { result: amount, interest, steps };
  }

  /**
   * Future Value of Annuity
   * @param {number} payment - Regular payment amount
   * @param {number} rate - Interest rate per period (as decimal)
   * @param {number} periods - Number of periods
   */
  static futureValueAnnuity(payment, rate, periods) {
    let fv;
    if (rate === 0) {
      fv = payment * periods;
    } else {
      fv = payment * ((Math.pow(1 + rate, periods) - 1) / rate);
    }
    const steps = [
      'Future Value of Annuity:',
      `Payment per period: ${payment}`,
      `Interest rate: ${(rate * 100).toFixed(2)}% per period`,
      `Number of periods: ${periods}`,
      rate === 0
        ? `FV = Payment × Periods = ${payment} × ${periods}`
        : `FV = P × [((1+r)^n - 1) / r] = ${fv.toFixed(2)}`,
      `Total Future Value = ${fv.toFixed(2)}`
    ];
    return { result: fv, steps };
  }

  /**
   * Present Value of Annuity
   * @param {number} payment - Regular payment amount
   * @param {number} rate - Interest rate per period (as decimal)
   * @param {number} periods - Number of periods
   */
  static presentValueAnnuity(payment, rate, periods) {
    let pv;
    if (rate === 0) {
      pv = payment * periods;
    } else {
      pv = payment * ((1 - Math.pow(1 + rate, -periods)) / rate);
    }
    const steps = [
      'Present Value of Annuity:',
      `Payment per period: ${payment}`,
      `Interest rate: ${(rate * 100).toFixed(2)}% per period`,
      `Number of periods: ${periods}`,
      rate === 0
        ? `PV = Payment × Periods = ${payment} × ${periods}`
        : `PV = P × [1 - (1+r)^(-n)] / r = ${pv.toFixed(2)}`,
      `Total Present Value = ${pv.toFixed(2)}`
    ];
    return { result: pv, steps };
  }

  /**
   * Loan Payment (EMI - Equated Monthly Installment)
   * @param {number} principal - Loan amount
   * @param {number} monthlyRate - Monthly interest rate (as decimal)
   * @param {number} months - Number of months
   */
  static loanPayment(principal, monthlyRate, months) {
    let payment;
    if (monthlyRate === 0) {
      payment = principal / months;
    } else {
      payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    }
    const totalPayment = payment * months;
    const totalInterest = totalPayment - principal;
    const steps = [
      'Loan Payment (EMI):',
      `Loan Amount: ${principal}`,
      `Monthly Interest Rate: ${(monthlyRate * 100).toFixed(4)}%`,
      `Loan Term: ${months} months`,
      `Monthly Payment = ${payment.toFixed(2)}`,
      `Total Amount Paid = ${totalPayment.toFixed(2)}`,
      `Total Interest = ${totalInterest.toFixed(2)}`
    ];
    return { result: payment, totalPayment, totalInterest, steps };
  }

  /**
   * Return on Investment (ROI)
   * @param {number} initialInvestment - Initial investment amount
   * @param {number} finalValue - Final value of investment
   */
  static roi(initialInvestment, finalValue) {
    const gain = finalValue - initialInvestment;
    const roiPercent = (gain / initialInvestment) * 100;
    const steps = [
      'Return on Investment (ROI):',
      `Initial Investment: ${initialInvestment}`,
      `Final Value: ${finalValue}`,
      `Gain/Loss: ${gain.toFixed(2)}`,
      `ROI = (Gain / Initial Investment) × 100 = ${roiPercent.toFixed(2)}%`
    ];
    return { result: roiPercent, gain, steps };
  }

  /**
   * Straight-Line Depreciation
   * @param {number} cost - Original cost
   * @param {number} salvageValue - Salvage value
   * @param {number} life - Useful life in years
   */
  static depreciation(cost, salvageValue, life) {
    const annualDepreciation = (cost - salvageValue) / life;
    const steps = [
      'Straight-Line Depreciation:',
      `Original Cost: ${cost}`,
      `Salvage Value: ${salvageValue}`,
      `Useful Life: ${life} years`,
      `Annual Depreciation = (Cost - Salvage) / Life`,
      `Annual Depreciation = (${cost} - ${salvageValue}) / ${life} = ${annualDepreciation.toFixed(2)}`
    ];
    return { result: annualDepreciation, steps };
  }

  /**
   * Break-Even Point
   * @param {number} fixedCosts - Fixed costs
   * @param {number} variableCostPerUnit - Variable cost per unit
   * @param {number} pricePerUnit - Selling price per unit
   */
  static breakEvenPoint(fixedCosts, variableCostPerUnit, pricePerUnit) {
    if (pricePerUnit <= variableCostPerUnit) {
      throw new Error('Selling price must be greater than variable cost per unit');
    }
    const units = fixedCosts / (pricePerUnit - variableCostPerUnit);
    const revenue = units * pricePerUnit;
    const steps = [
      'Break-Even Point:',
      `Fixed Costs: ${fixedCosts}`,
      `Variable Cost per Unit: ${variableCostPerUnit}`,
      `Selling Price per Unit: ${pricePerUnit}`,
      `Break-Even Units = Fixed Costs / (Price - Variable Cost)`,
      `Break-Even Units = ${fixedCosts} / (${pricePerUnit} - ${variableCostPerUnit}) = ${units.toFixed(2)}`,
      `Break-Even Revenue = ${revenue.toFixed(2)}`
    ];
    return { result: units, revenue, steps };
  }
}

module.exports = FinanceCalculator;
