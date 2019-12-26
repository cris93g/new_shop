INSERT INTO craig_items
    ( userId,name, descr,category)
VALUES($1, $2, $3, $4)
RETURNING *;