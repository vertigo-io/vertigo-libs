const express = require('express')
const compiler = require('vue-template-compiler')

var app = new express();
app.use(express.json())

app.post('/compile', (req, res) => {
  let compiledTemlate = compiler.compile(req.body.template)
  res.end(`{
    "render" : ${JSON.stringify(compiledTemlate.render)},
    "staticRenderFns" : ${JSON.stringify(compiledTemlate.staticRenderFns)}
  }`)
})

app.listen(8083)