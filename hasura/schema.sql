-- Uh... Nearly whats in hasura

CREATE TABLE public.journey (
    id text NOT NULL,
    name text NOT NULL
);
CREATE SEQUENCE public.journey_loc_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
CREATE TABLE public.journey_location (
    id integer DEFAULT nextval('public.journey_loc_seq'::regclass) NOT NULL,
    journey_id text NOT NULL,
    location text NOT NULL,
    "timestamp" timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE ONLY public.journey_location
    ADD CONSTRAINT journey_location_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.journey
    ADD CONSTRAINT journey_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.journey_location
    ADD CONSTRAINT journey_location_journey_id_fkey FOREIGN KEY (journey_id) REFERENCES public.journey(id);