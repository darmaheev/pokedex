import React from "react";

import {STAT_LIST} from "../../constants/common"
import StatItem from "../StatItem"
import {
  Wrapper
} from "./styles"

const initialSumValue = 0;

const StatList = ({
  stats
}) => {
  return (
    <Wrapper>
      {Object.keys(STAT_LIST).map(stat => (<StatItem key={STAT_LIST[stat].value} label={STAT_LIST[stat].label} value={stats.find(pS => pS.stat.name === STAT_LIST[stat].value).base_stat}/>))}
      <StatItem label={"Total"} value={stats.reduce((acum, stat) => (acum + stat.base_stat), initialSumValue)}/>
    </Wrapper>
  );
};

export default StatList;