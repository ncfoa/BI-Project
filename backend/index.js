const neo4j = require('neo4j-driver');
const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors({
    origin: ["http://127.0.0.1:3000"],
    credentials: true,
}));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "firas123"))

async function doThis(country){
const session = driver.session();
try {

  const result = await session.run(
  'MATCH (opinion:Opinion)-[:give_opinion]->(airline:Airline)\
  MATCH (route:Route)-[:by]->(airline)\
  MATCH (route)-[:from]->(airport:Airport{country:"' + country + '"})\
  RETURN airline.name, sum(toInteger(opinion.score)) as score\
  ORDER BY score DESC'
  )

  const singleRecord = result.records[0]
  if (singleRecord){
    const node = singleRecord.get(0)
    return node ;
  } else {
    return {};
  }

} finally {
  await session.close()
}
}

async function doThat(airpline,score){
  const session = driver.session();
  try {
    const result = await session.run(
      'CREATE (opinion:Opinion{airpline:"'+ airpline +'",score:"'+ score + '"}) RETURN opinion;'
    )
    const singleRecord = result.records[0]
    if (singleRecord){
      const node = singleRecord.get(0)
      return {success: "This opinion is saved successfully"} ;
    } else {
      return {success: "This opinion is saved successfully"};
    }
  
  } finally {
    await session.close()
  }
  }

// simple route
app.get("/:address", async (req, res) => {
  let address = req.params.address ;
  let x = await doThis(address);
  console.log(x);
  res.json({airpline: x}) ;
});

app.get("/:airline/:score", async (req, res) => {
  let {airline,score} = req.params ;
  let x = await doThat(airline,score);
  console.log(x);
  res.json(x) ;
});

app.listen(5000,() => {
  console.log("Listening to port 5000");
})
