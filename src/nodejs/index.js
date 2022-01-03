const express = require('express');
require('isomorphic-fetch');

const app = express();
app.use(express.json());

const storeName = 'statestore'
const storeUrl = `http://localhost:3500/V1.0/state/${storeName}`;
const port = 3000;

app.get('/product', (_req, res) => {
    fetch(`${storeUrl}/product`)
        .then((response) => {
            if (!response.ok) {
                response.text().then((text) => { console.log(text); });
                throw "Impossible de récupérer le produit";
            }

            return response.text();
        }).then((products) => {
            console.log(products);
            res.send(products);
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ message: error });
        });
});

app.get('/product/:id', (req, res) => {
    const key = req.params.id;

    console.log("Etat récupéré pour l'ID : " + key);
});

app.post('/product', (req, res) => {
    const data = req.body.data;
    const productId = data.productId;
    console.log("Nouveau produit! ID du produit: " + productId);

    const state = [{
        key: 'product',
        value: data
    }];

    fetch(storeUrl, {
        method: 'POST',
        body: JSON.stringify(state),
        headers: { 'Content-Type': 'application/json' }
    }).then(response => {
        if (!response.ok) {
            throw "Impossible de sauvegarder l'état";
        }

        console.log("Etat sauvegardé !");
        res.status(200).send();
    })
});

app.delete('/order/:id', (req, res) => {
    const key = req.params.id;
    console.log('Suppression du produit avec ID ' + key);
});

app.listen(port, () => console.log(`L'application écoute sur le port ${port}!`));