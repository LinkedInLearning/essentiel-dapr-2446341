const express = require('express');
require('isomorphic-fetch');

const app = express();
app.use(express.json());

const port = 3000;

app.get('/product', (_req, res) => {
    console.log("Etat récupéré !");
});

app.get('/product/:id', (req, res) => {
    const key = req.params.id;

    console.log("Etat récupéré pour l'ID : " + key);
});

app.post('/product', (req, res) => {
    const data = req.body.data;
    const productId = data.productId;
    console.log("Nouveau produit! ID du produit: " + productId);
});

app.delete('/order/:id', (req, res) => {
    const key = req.params.id;
    console.log('Suppression du produit avec ID ' + key);
});

app.listen(port, () => console.log(`L'application écoute sur le port ${port}!`));