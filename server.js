// importa o framework express, usado para criar o servidor web (HTTP)
import express from "express";
// importa o modulo node-fetch para permitir fazer requisicoes HTTP
import fetch from "node-fetch";
// importa o modulo cors para permitir  chamem este servidor
import cors from "cors";

// cria uma instancia do express (servidor)
const app = express();
// permite acesso de qualquer origem
app.use(cors()); 

// define a rota GET (pegar a informacao) para o endpoint /api/geojson
app.get("/api/geojson", async (req, res) => {

  // url usada para buscar os dados diretamente do geoserver da SEMOB
  const url =
    "https://geoserver.semob.df.gov.br/geoserver/semob/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=semob%3A%C3%9Altima%20posi%C3%A7%C3%A3o%20da%20frota&outputFormat=application%2Fjson";
  try {
    // faz a requisicao HTTP para o geoserver
    const response = await fetch(url);
    // converte a resposta para JSON
    const data = await response.json();
    // envia os dados JSON como resposta para o cliente
    res.json(data);
  } catch (error) { 
    // se der erro, mostra no terminal
    console.error(error);
    // envia uma resposta de erro para o cliente
    res.status(500).json({ error: "Erro ao buscar dados do GeoServer" });
  }
});

// inicia o servidor na porta 3000
app.listen(3000, () => console.log("✅ Proxy rodando em http://localhost:3000/api/geojson"));