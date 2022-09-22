let obj = {
  name: 'jlg',
  children: [
    {
      name: 'hf',
      children: [{ name: 'yangjin', children: [] }],
    },
    {
      name: 'scz',
      children: [{ name: 'chenziyu', children: [] }],
    }
  ]
}


function dfs(_obj) {
  let res = [];
  res.push(_obj.name);
  _obj.children.forEach((item, index) => {
    res = res.concat(dfs(item))
  })
  return res;
}

console.log(dfs(obj));