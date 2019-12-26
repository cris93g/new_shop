UPDATE craig_items SET descr = ($1) WHERE id =($2)
RETURNING *;