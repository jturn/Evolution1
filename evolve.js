
var target;

var evolve = function(string) {
   target = string;
  //Create a population of 200 strings with length equal to target string
  var population = populate(400, target.length);
  var best = population.sort(function(a,b) {return fitness(a, target) < fitness(b, target);})[0];
//Create a chromosome - a string that holds a solution(12 character string)while (best !== target) {
  var count = 0;
  while (best !== target) {
    mate(population);
    mate(population);
    remove(population);
    mutate(population, target);
    var best = population.sort(function(a,b) {return fitness(a, target) < fitness(b, target);})[0];
    console.log(best + " " + count + "cycle.");
    count++;
  }
};

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
  var population = [];
  for (var i = 0; i < popSize; i++) {
    population.push(chromosome(stringSize));
  }

  return population;
};

//Create a fitness function
var fitness = function(chromosome, target) {
  var fitLevel = 0;

  for (var i = 0; i < chromosome.length; i++) {
    fitLevel += Math.abs(target.charCodeAt(i) < chromosome.charCodeAt(i));
  }

  return fitLevel;
};


//(Mostly) random selection
var mate = function(array, target) {
  var pool = [];
  var parents = [];
  //Add 8 parents to the pool, select the two with lowest fitness to mate
  for (var i = 0; i < 8; i++) {
    var random = Math.floor(Math.random() * array.length);
    pool.push(array[random]);
  }
  pool.sort(function(a,b) {return fitness(a, target) < fitness(b, target);});
  parents.push(pool[0]);
  parents.push(pool[1]);
  //Combine the parents using half of each to make a new string
  var child = [];
  
    for (var i = 0; i <parents[0].length; i++) {
      if (fitness(parents[0][i], target) < 6) {
        child.push(parents[0][i]);
      } else {
        var random = Math.floor(Math.random() * (123-64)) + 64;
        child.push(String.fromCharCode(random));
        }
    }
    for (var i = 0; i < parents[1].length; i++) {
      if (fitness(parents[1][i], child[i]) < 6) {
        child.push(parents[1][i]);
      } else {
        var random = Math.floor(Math.random() * (123-64)) + 64;
        child.push(String.fromCharCode(random));
      }
    }
  array.push(child);
};
//Gives one random element a chance to mutate new characters close to target
var mutate = function(array, target) {
  var random = Math.floor(Math.random() * array.length);
  var selection = array[random].split("");
  var closest = target.split("");
  for (var i = 0; i < selection.length; i++) {
    //Gives a 1 in 2 chance of mutating
    if (Math.floor(Math.random() * 4) === 2) {
    selection[i] = closest[Math.floor(Math.random() * closest.length)];
    }
    array[random] = selection.join("");
  }
};

var remove = function(array) {
  array.sort(function(a,b) {return fitness(a, target) < fitness(b, target);});
  array.pop();
};
