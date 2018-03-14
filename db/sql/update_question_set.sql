CREATE OR REPLACE FUNCTION public.update_question_set(
    _id bigint,
    _question_set_name character varying,
    _total_time integer,
    _total_mark integer,
    _active boolean,
    _active_on timestamp with time zone,
    _question_ids bigint[])
  RETURNS void AS
$BODY$DECLARE
  question_id bigint;
  
BEGIN

UPDATE question_set_detail
SET question_set_name = _question_set_name, total_time = _total_time, 
total_mark = _total_mark, active = _active, updated_at = CURRENT_TIMESTAMP, 
active_on = _active_on
WHERE id = _id;

DElETE FROM question_set_detail_group
WHERE set_detail_id = _id;

FOREACH question_id in ARRAY _question_ids
 LOOP
    INSERT INTO question_set_detail_group VALUES(_id, question_id);
    -- RAISE notice '%', question_id;
 END LOOP;

END;$BODY$
  LANGUAGE plpgsql