var evolve = function(string) {
  var target = string;
  //Create a population of 200 strings with length equal to target string
  var population = populate(200, target.length);
  var best = population.sort(function(a,b) {return fitness(a, target) - fitness(b, target);})[0];

  while (best !== target) {
  var count = 0;
  var best = population.sort(function(a,b) {return fitness(a, target) - fitness(b, target);})[0];
  mate(population);
  remove();
  console.log(best + " " + count + "cycle.");
  count++;
};

//Create a chromosome - a string that holds a solution(12 character string)
var chromosome = function(length) {
  var result = [];

  for (var i = 0; i < length; i++) {
    var random = Math.floor(Math.random() * (123-64)) + 64;
    result.push(String.fromCharCode(random));
  }
  return result.join("");
};

//Create a population of n random 12 character strings
  //Each string is made of alphanumeric characters
var populate = function(popSize, stringSize) {
  for (var i = 0; i < popSize; i++) {
    population.push(chromosome(stringSize));
  }

  return population;
};

//Create a fitness function
var fitness = function(chromosome, target) {
  var fitLevel = 0;

  for (var i = 0; i < chromosome.length; i++) {
    fitLevel += Math.abs(target.charCodeAt(i) - chromosome.charCodeAt(i));
  }

  return fitLevel;
};

//(Mostly) random selection
var mate = function() {
  var pool = [];
  var parents = [];
  //Add 4 parents to the pool, select the two with lowest fitness to mate
  for (var i = 0; i < 4; i++) {
    var random = Math.floor(Math.random() * population.length);
    pool.push(population[random]);
  }
  pool.sort(function(a,b) {return fitness(a, target) - fitness(b, target);});
  parents.push(pool[0]);
  parents.push(pool[1]);
  //Combine the parents using half of each to make a new string
  var child = (parents[0].toString().slice(0, parents[0].length/2)) + (parents[1].toString().slice(parents[1].length/2));
  
  population.push(child);
};
//Sort the population and remove the target with lowest FitLevel
var remove = function() {
  population.sort(function(a,b) {return fitness(a, target) - fitness(b, target);});
  population.pop();
};



};
