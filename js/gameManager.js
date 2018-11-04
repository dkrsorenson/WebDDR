export {  }

// attributes
let health = 0;
let maxHealth = 100;

function SetHealth(hp){
    health = hp;
    if (health > maxHealth)
        health = maxHealth;
}

function GetHealth(){
    return health;
}

