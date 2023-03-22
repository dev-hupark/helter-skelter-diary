const setCodes = (master, code, name, desc, order) => (
  {
    'master': master,
    'code': code,
    'name': name,
    'desc': desc,
    'order': order
  }
)

const Codes = [
  setCodes('todo_state', 'undone', '미완료', '', 0),
  setCodes('todo_state', 'done', '완료', '', 0),
]

const getCode = (master, code, field) => {
  const key = field === undefined ? 'name' : field

  const codeTmp = Codes.filter(c => c.master === master && c.code === code)

  if(codeTmp.length === 0){
    return 'error'
  }

  return codeTmp[0][key]
}

export {
  Codes,
  getCode,
}