# HP Manager

# Install

```
npm install hp-manager
```

# Load

```
var hpManager = require('hp-manager');
```

# Usage
## Setting
First, the required settings for HP management.
Setting values are the following four.

- DB information (Required)
- Location to save HP
- The maximum value of HP
- The minimum value of HP

In particular, you should be set with care DB information and the location (key) to save HP. 

DB information must be an object that has always the method of `set` and `get`.  
The location (key) to save the HP, is a clue for loading HP information to be stored in the table.
Therefore, do not set the value (key) that overlaps with the value stored in the table in the Location to save HP.

The following is a setting for using the hubot brain (Redis).
```
var hpMana = new hpManager({
    db: robot.brain,
    hpKey: 'hpManager',
    max: 100,
    min: 10
});
```

## Let's manage HP
In HP management, this module has the following features:

- Registered user
- HP changes (addition, subtraction)
- Get HP of user
- Delete user

### Registered user
When you first "attack" or "care", registered user.

### HP changes (addition, subtraction)

If you want to attack,
```
var hp = hpMana.attack(user ,damage);
```

If you want to care,
```
var hp = hpMana.care(user ,point);
```

Argument is a user (string) and in the damage (numeric), and remaining HP of the user is stored in the `hp`.

### Get HP of user

If you get the HP of all users,
```
var list = hpMana.status();
```

If you get the HP of a specific user,
```
var list = hpMana.status(user);
```

Argument is a `user` (string), and `list` is the object that contains name and hp.

### Delete user

To the following,
```
var list = hpMana.delete(user);
```
Argument is a `user` (string), and `list` is the object that contains name and hp.

# Example of usage in Hubot
As follows: write the script of Hubot.

```
var hpManager = require('hp-manager');

module.exports = function(robot) {
  var hpMana = new hpManager({ db: robot.brain,
      hpKey: 'hpManager',
      max: 100,
      min: 10
      });

  robot.respond(/attack (\w+)/i, function(msg) {
      var user = msg.match[1];
      var damage = 10;
      var hp = hpMana.attack(user ,damage);
      msg.send(`Ouch!! ${user} damaged ${damage}！\nHP: ${hp}/${hpMax}`);
      });
}
```

After that only call hubot!
```
hubot> hubot:attack goma
hubot> Ouch!! goma damaged 10！
HP: 90/100
```
