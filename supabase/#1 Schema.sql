CREATE TABLE public.wallets (
    wallet text PRIMARY KEY,
    userdata json,
    hasPaid boolean,
    CONSTRAINT unique_wallet UNIQUE (wallet)
);

ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select their own records"
on "public"."wallets"
to public
using (7
  (((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = wallet)

);