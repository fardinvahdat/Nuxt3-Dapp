async function c(t,a){const r=a.map(n=>({...n,abi:n.abi}));return t.multicall({contracts:r})}async function s(t,a){return t.readContract({...a,abi:a.abi})}export{c as a,s};
