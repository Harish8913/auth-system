import pg from 'pg';
const { Pool } = pg;

const requireEnv = (name: string): string => {
    const value = process.env[name];
    if(!value) throw new Error(`Missing Environment Variable: ${name}`);
    return value;
}

export const pool = new Pool({
    user: requireEnv('USER'),
    host: requireEnv('HOST'),
    database: requireEnv('DATABASE'),
    password: requireEnv('PASSWORD'),
    port:  parseInt(process.env.PORT || '5432', 10),
})