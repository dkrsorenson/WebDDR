export { setHealth, getHealth, getMaxHealth }

// attributes
let health = 20;
let maxHealth = 20;

function setHealth(hp){
    health = hp;
    if (health > maxHealth)
        health = maxHealth;

    else if (health < 0)
        health = 0;
}

function getHealth(){
    return health;
}

function getMaxHealth(){
    return maxHealth;
}