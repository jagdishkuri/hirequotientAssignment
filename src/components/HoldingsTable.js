import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  tableHeader: {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
    border: '1px solid #ddd',
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#f2f2f2',
    },
    borderBottom: '1px solid #ddd',
  },
  negativeChange: {
    color: 'red',
  },
  expandCollapseButton: {
    backgroundColor: 'blue',
    color: 'white',
    marginRight: '10px',
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    border: '1px solid #ddd',
  },
});

function HoldingsTable({ holdings }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (assetClass) => {
    setExpanded(prevExpanded => ({
      ...prevExpanded,
      [assetClass]: !prevExpanded[assetClass]
    }));
  };

  // Group holdings by asset class
  const holdingsByAssetClass = {};
  holdings.forEach(holding => {
    if (!holdingsByAssetClass[holding.asset_class]) {
      holdingsByAssetClass[holding.asset_class] = [];
    }
    holdingsByAssetClass[holding.asset_class].push(holding);
  });

  // Count entries for each asset class
  const getEntryCount = (assetClass) => {
    return holdingsByAssetClass[assetClass] ? holdingsByAssetClass[assetClass].length : 0;
  };

  return (
    <div>
      {Object.entries(holdingsByAssetClass).map(([assetClass, assetHoldings]) => (
        <div key={assetClass} style={{ marginBottom: '20px' }}>
          <h2>
            <Button onClick={() => toggleExpand(assetClass)} className={classes.expandCollapseButton}>
              {expanded[assetClass] ? 'Collapse' : 'Expand'}
            </Button>
            {assetClass} ({getEntryCount(assetClass)})
          </h2>
          {expanded[assetClass] && (
            <Table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableHeader}>
                  <TableCell>Name of the holding</TableCell>
                  <TableCell>Ticker</TableCell>
                  <TableCell>Average price</TableCell>
                  <TableCell>Market Price</TableCell>
                  <TableCell>Latest change percentage</TableCell>
                  <TableCell>Market Value in Base CCY</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assetHoldings.map((holding, index) => (
                  <TableRow key={`${holding.name}-${index}`} className={index % 2 === 0 ? classes.tableRow : null}>
                    <TableCell>{holding.name}</TableCell>
                    <TableCell>{holding.ticker}</TableCell>
                    <TableCell>{holding.avg_price}</TableCell>
                    <TableCell>{holding.market_price}</TableCell>
                    <TableCell className={holding.latest_chg_pct < 0 ? classes.negativeChange : null}>{holding.latest_chg_pct}</TableCell>
                    <TableCell>{holding.market_value_ccy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      ))}
    </div>
  );
}

export default HoldingsTable;
