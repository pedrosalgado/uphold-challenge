export default async function handler(req, res) {
    try {
        const response = await fetch('https://api.uphold.com/v0/assets');
        if (!response.ok) {
            res.status(response.status).json({ error: 'Failed to fetch assets' });
            return;
        }
        const data = await response.json();

        // Filter only specific currencies (e.g., BTC and ETH)
        const filteredAssets = data.filter(asset =>
            [
                'USD',
                'BTC',
                'ETH',
                'BNB',
                'XRP',
                'ADA',
                'SOL',
                'DOT',
                'DOGE',
                'LTC',
                'AVAX',
                'SHIB',
                'MATIC',
                'TRX',
                'XLM',
                'UNI',
                'ATOM',
                'LINK',
                'BCH',
                'ALGO',
                'ICP',
                'AAVE',
                'VET',
                'FIL',
                'XTZ'
            ].includes(asset.code)
        );

        res.status(200).json(filteredAssets);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}