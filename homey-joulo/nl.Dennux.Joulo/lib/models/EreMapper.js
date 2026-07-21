'use strict';

class EreMapper {

    static fromApi(response) {

        return {

            complianceYear: response.compliance_year,
            pendingEre: response.pending_ere,
            allocatableEre: response.allocatable_ere,

            ytdExpectedEur: response.ytd_expected_eur,
            totalExpectedEur: response.total_expected_eur,

            effectiveFeePct: response.effective_fee_pct,
            realizedAvgPrice: response.realized_avg_price,
            indicativePricePerEre: response.indicative_price_per_ere,

            forecastConfidence: response.forecast_confidence,
            forecastIsProjected: response.forecast_is_projected,

            paid: {
                ere: response.paid?.ere,
                netEur: response.paid?.net_eur,
                pricePerEre: response.paid?.price_per_ere,
            },

            unsold: {
                ere: response.unsold?.ere,
                ytdEre: response.unsold?.ytd_ere,
                futureEre: response.unsold?.future_ere,
                forecastNetEur: response.unsold?.forecast_net_eur,
                ytdForecastNetEur: response.unsold?.ytd_forecast_net_eur,
                futureForecastNetEur: response.unsold?.future_forecast_net_eur,
            },

            payable: {
                ere: response.payable?.ere,
                netEur: response.payable?.net_eur,
                pricePerEre: response.payable?.price_per_ere,
            },

            reserved: {
                ere: response.reserved?.ere,
                netEur: response.reserved?.net_eur,
                pricePerEre: response.reserved?.price_per_ere,
            },

            quarters: (response.quarters ?? []).map(quarter => ({

                quarter: quarter.quarter,
                ere: quarter.ere,
                soldEre: quarter.sold_ere,
                pricePerEre: quarter.price_per_ere,

            })),

        };

    }

}

module.exports = EreMapper;