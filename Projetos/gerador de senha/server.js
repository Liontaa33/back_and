const express = require('express');
const bodyParser = require('body-parser');

const app = express()
const port = 3000

// Middleware para processar o process JSON 
app.use(bodyParser.json());

// função que gera as senhas
function generatePassword(length, useUppercase, useNumbers, useSpecialchars) {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    const specialChars = '!@#$%^&*()-_=+[{]}\\|;:\'",<.>/?'

    let charactePool = lowercaseChars;

    if (useUppercase) charactePool += uppercaseChars;
    if (useNumbers) charactePool += numbers;
    if (useSpecialchars) charactePool += specialChars;

    if (!charactePool) {
        throw new Error('Nenhum caractere foi selecionado')
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomindex = Math.floor(Math.random() * charactePool.length)
        password += charactePool[randomindex]
    }
    return password;
}

// retorna senha 


// rota para gerar as senha 
app.post('/generate-password', (req, res) => {

    const { length, useUppercase, useNumbers, useSpecialchars } = req.body

    if (!length || typeof length != 'number' || length < 0) {
        return res.status(400).json({ error: 'O campo length (o tamanho da senha) deve ser um número maior que 0' });
    }

    try {
        const password = generatePassword(length, useUppercase, useNumbers, useSpecialchars)
        res.json({ password })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

// inicialização o servidor 
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})