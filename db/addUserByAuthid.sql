INSERT INTO cust
    (auth_id,pic,name)
VALUES
    ($1, $2,
        $3)
RETURNING *;