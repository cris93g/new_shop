INSERT INTO wel_items
    (name,descr)
VALUES($1, $2)
RETURNING *;