CREATE TABLE public.wallets (
    wallet text PRIMARY KEY,
    userdata json,
    hasPaid boolean,
    CONSTRAINT unique_wallet UNIQUE (wallet)
);

ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select their own records" ON public.wallets
FOR SELECT
TO authenticated
USING ((current_setting('jwt.claims.sub')::text) = wallet);