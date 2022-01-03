const express = require('express');
require('isomorphic-fetch');

const app = express();
app.use(express.json());

const storeName = 'linkedin-dapr-store'
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

    fetch(`${storeUrl}/product_${key}`)
        .then((response) => {
            if (!response.ok) {
                response.text().then((text) => { console.log(text); });
                throw `Impossible de récupérer le produit avec l'ID ${key}`;
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

app.post('/product', (req, res) => {
    const data = req.body.data;
    const productId = data.productId;
    console.log("Nouveau produit! ID du produit: " + productId);

    var calls = [
        fetch(storeUrl, {
            method: 'POST',
            body: JSON.stringify([{ key: 'product', value: data }]),
            headers: { 'Content-Type': 'application/json' }
        }),
        fetch(storeUrl, {
            method: 'POST',
            body: JSON.stringify([{ key: `product_${productId}`, value: data }]),
            headers: { 'Content-Type': 'application/json' }
        })
    ];

    Promise
    .all(calls)
    .then((results) => {
        if (!results[0].ok || !results[1].ok) {
            throw "Impossible de sauvegarder l'état";
        }

        console.log("Etat sauvegardé !");
        res.status(200).send();
    });
});

app.delete('/product/:id', (req, res) => {
    const key = req.params.id;
    console.log('Suppression du produit avec ID ' + key);

    fetch(`${storeUrl}/product_${key}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (!response.ok) {
            throw "Impossible de supprimer le produit";
        }

        console.log("Produit supprimé !");
        res.status(200).send();
    });
});

app.listen(port, () => console.log(`L'application écoute sur le port ${port}!`));