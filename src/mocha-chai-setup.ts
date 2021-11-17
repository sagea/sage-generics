const loadScript = async (src, type = 'text/javascript') => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.setAttribute('type', type)
    script.onload = resolve
    script.onerror = reject
    document.body.appendChild(script)
  })
}
const loadCss = async (src) => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.href = src
    link.setAttribute('rel', 'stylesheet')
    link.onload = resolve
    link.onerror = reject
    document.body.appendChild(link)
  })
}
export const setupMochaChai = async ({
	mochaVersion = '9.1.3',
  chaiVersion = '4.3.4',
} = {}, caller) => {
	if (typeof caller !== 'function') {
  	throw new Error('Expecting caller to be a function')
  }
  const node = document.createElement('div')
  node.setAttribute('id', 'mocha')
  document.body.appendChild(node);
  console.log('woah')
	await Promise.all([
	  loadScript(`https://unpkg.com/mocha@${mochaVersion}/mocha.js`),
    loadCss(`https://unpkg.com/mocha@${mochaVersion}/mocha.css`),
	  loadScript(`https://unpkg.com/chai@${chaiVersion}/chai.js`),
  ])
  console.log('here yo')
	mocha.setup('bdd');
	await caller(chai, mocha)
  mocha.run();
}
