const express = require("express"); // Chamdno os arquivos da pasta node_modules, e adicionar o express ao programa.
const res = require("express/lib/response");
const path = require("path"); //Chamdno os arquivos da pasta node_modules, e ter acesso a pasta public.

const app = express(); //Adicionando o express em uma constante para chama-lo no código.
const port = process.env.PORT || 3000; // Const para armanezar a porta do servidor, a primeira é a porta do deploy ou se estiver rodando no computador, ele vai para a porta 3000.

app.set("view engine", "ejs"); //Configurando o motor de visualização para ter acesso ao arquivo index.ejs
app.use(express.static(path.join(__dirname, "public"))); //Caminho para o código conseguir ler o diretório public.
app.use(express.urlencoded()); //Forma de trafegar os dados entre o index.ejs e o endex.js.

//Criação do array do projeto, no caso são jogos, aqui são definidos os parâmetros que vão ser enviados para o arquivo ejs, e vice-versa.

const catalogo = [
  {
    id: 1,
    nome: "FINAL FANTASY VII REMAKE",
    descricao:
      "A história se passa na metrópole de Midgar e acompanha o mercenário Cloud Strife, que se junta a um grupo ecoterrorista em uma tentativa de impedir que a poderosa megacorporação Shinra use a essência vital do planeta como fonte de energia. A jogabilidade combina combate em tempo real com elementos de estratégia.",
    imagem:
      "https://image.api.playstation.com/vulcan/img/cfn/11307T0vPiiGfDpR_Ni5Un5FbQVxwIajUBC9pqjcdLh9pMc8bG6HiVSuqpR8SdJ-_6AiJMKhnX2j6QenTHzFrxWKIJ0X4Sdx.png?w=780&thumb=false",
  },
  {
    id: 2,
    nome: "Red Dead Redemption 2",
    descricao:
      "Em 1899, Red Dead Redemption 2 segue a história de Arthur Morgan, um membro da guangue de bandidos de Dutch Van der Linde. Depois de tudo dar errado durante um roubo em uma cidade do oeste chamada Blackwater, Arthur Morgan e a gangue Van der Linde são forçados a fugir.",
    imagem:
      "https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/3zDubiWo2X5WU18FGiwlsf4lKWb8MwkE.png?w=780&thumb=false",
  },
  {
    id: 3,
    nome: "KINGDOM HEARTS III",
    descricao:
      "KINGDOM HEARTS III conta a história do poder da amizade enquanto Sora e seus amigos embarcam em uma perigosa aventura. O jogo se passa em diversos mundos da Disney e Pixar, seguindo a jornada de Sora, um jovem garoto que desconhece o poder espetacular que herdou.",
    imagem:
      "https://image.api.playstation.com/cdn/UP0082/CUSA12031_00/2cDLg6Rr5WDa2lvYmli45ytrd9it9zrv.png?w=780&thumb=false",
  },
];

let games = undefined;
let message = "";

// Renderizando a página principal com meu array.
app.get("/", (req, res) => {
  setTimeout(() => {
    message = "";
  }, 1000);

  res.render("index", { catalogo, games, message });
});

//Renderizando a página cadastro.
app.get("/cadastro", (req, res) => {
  setTimeout(() => {
    message = "";
  }, 1000);

  res.render("cadastro", { catalogo, games, message });
});

app.get("/details", (req, res) => {
  res.render("details", { catalogo, games });
});

// Tornando a página Cadastro capaz de adicionar novos itens ao meu array.
app.post("/create", (req, res) => {
  const games = req.body;
  games.id = catalogo.length + 1;
  catalogo.push(games);
  message = "O cadastro do seu jogo foi realizado com sucesso!"
  res.redirect("/");
});


app.get("/info/:id", (req, res) => {
  const id = +req.params.id;
  games = catalogo.find((games) => games.id === id);
 res.redirect("/details");
});

app.get("/detalhes/:id", (req, res) => {
  const id = +req.params.id;
  games = catalogo.find((games) => games.id === id);
  res.redirect("/cadastro");
});


app.post("/update/:id", (req, res) => {
  const id = +req.params.id - 1;
  const newGames = req.body;
  newGames.id = id + 1;
  catalogo[id] = newGames;
  games = undefined;
  message = "O cadastro do seu jogo foi atualizado com sucesso!"
  res.redirect("/#cards");
});

app.get("/delete/:id", (req, res) => {
  const id = +req.params.id - 1;
  delete catalogo[id];
  message = "O seu jogo foi deletado com sucesso!"
  res.redirect("/");
});

// Adicionando a const port e uma arow function de callback para mostrar no console que o servidor está rodando.
app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
