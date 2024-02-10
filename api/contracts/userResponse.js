const userSchema = {
    "title": "User Schema",
    "type": "object",
    "required": [
        "id",
        "userName",
        "email",
        "password",
        "roles"
    ],
    "properties": {
        "id": {
            "title": "The id Schema",
            "type": "string"
        },
        "userName": {
            "title": "The userName Schema",
            "type": "string"
        },
        "email": {
            "title": "The email Schema",
            "type": "string"
        },
        "password": {
            "title": "The password Schema",
            "type": "string"
        },
        "roles": {
            "title": "The roles Schema",
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "firstName": {
            "title": "The firstName Schema",
            "type": ["string", "null"]
        },
        "lastName": {
            "title": "The lastName Schema",
            "type": ["string", "null"]
        },
        "fullName": {
            "title": "The fullName Schema",
            "type": ["string", "null"]
        }
    }
};


module.exports= {userSchema};