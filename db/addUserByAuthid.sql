INSERT INTO craig_users
    (auth_id,first_name,last_name,picture)
VALUES
    ($1, $2,
        $3, $4)
RETURNING *;