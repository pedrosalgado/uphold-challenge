export default async function handler(req, res) {
  try {
    const response = await fetch('https://api.uphold.com/v0/assets');
    if (!response.ok) {
      res.status(response.status).json({ error: 'Failed to fetch assets' });
      return;
    }
    const data = await response.json();

    const filteredAssets = data
      .filter((asset) =>
        [
          'AAVE',
          'ADA',
          'ALGO',
          'ATOM',
          'AVAX',
          'BCH',
          'BNB',
          'BTC',
          'DOGE',
          'DOT',
          'ETH',
          'FIL',
          'ICP',
          'LINK',
          'LTC',
        ].includes(asset.code)
      )
      .map((asset) => ({
        code: asset.shortName,
        name: asset.name,
        image: asset.image,
        status: asset.status,
      }));

    res.status(200).json(filteredAssets);
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
