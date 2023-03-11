/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "journey" */
export type Journey = {
  __typename?: 'journey';
  id: Scalars['String'];
  /** An array relationship */
  journey_locations: Array<Journey_Location>;
  /** An aggregate relationship */
  journey_locations_aggregate: Journey_Location_Aggregate;
  name: Scalars['String'];
};


/** columns and relationships of "journey" */
export type JourneyJourney_LocationsArgs = {
  distinct_on?: InputMaybe<Array<Journey_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Journey_Location_Order_By>>;
  where?: InputMaybe<Journey_Location_Bool_Exp>;
};


/** columns and relationships of "journey" */
export type JourneyJourney_Locations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Journey_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Journey_Location_Order_By>>;
  where?: InputMaybe<Journey_Location_Bool_Exp>;
};

/** aggregated selection of "journey" */
export type Journey_Aggregate = {
  __typename?: 'journey_aggregate';
  aggregate?: Maybe<Journey_Aggregate_Fields>;
  nodes: Array<Journey>;
};

/** aggregate fields of "journey" */
export type Journey_Aggregate_Fields = {
  __typename?: 'journey_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Journey_Max_Fields>;
  min?: Maybe<Journey_Min_Fields>;
};


/** aggregate fields of "journey" */
export type Journey_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Journey_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "journey". All fields are combined with a logical 'AND'. */
export type Journey_Bool_Exp = {
  _and?: InputMaybe<Array<Journey_Bool_Exp>>;
  _not?: InputMaybe<Journey_Bool_Exp>;
  _or?: InputMaybe<Array<Journey_Bool_Exp>>;
  id?: InputMaybe<String_Comparison_Exp>;
  journey_locations?: InputMaybe<Journey_Location_Bool_Exp>;
  journey_locations_aggregate?: InputMaybe<Journey_Location_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "journey" */
export enum Journey_Constraint {
  /** unique or primary key constraint on columns "id" */
  JourneyPkey = 'journey_pkey'
}

/** input type for inserting data into table "journey" */
export type Journey_Insert_Input = {
  id?: InputMaybe<Scalars['String']>;
  journey_locations?: InputMaybe<Journey_Location_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "journey_location" */
export type Journey_Location = {
  __typename?: 'journey_location';
  id: Scalars['Int'];
  journey_id: Scalars['String'];
  location: Scalars['String'];
  timestamp: Scalars['timestamptz'];
};

/** aggregated selection of "journey_location" */
export type Journey_Location_Aggregate = {
  __typename?: 'journey_location_aggregate';
  aggregate?: Maybe<Journey_Location_Aggregate_Fields>;
  nodes: Array<Journey_Location>;
};

export type Journey_Location_Aggregate_Bool_Exp = {
  count?: InputMaybe<Journey_Location_Aggregate_Bool_Exp_Count>;
};

export type Journey_Location_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Journey_Location_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Journey_Location_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "journey_location" */
export type Journey_Location_Aggregate_Fields = {
  __typename?: 'journey_location_aggregate_fields';
  avg?: Maybe<Journey_Location_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Journey_Location_Max_Fields>;
  min?: Maybe<Journey_Location_Min_Fields>;
  stddev?: Maybe<Journey_Location_Stddev_Fields>;
  stddev_pop?: Maybe<Journey_Location_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Journey_Location_Stddev_Samp_Fields>;
  sum?: Maybe<Journey_Location_Sum_Fields>;
  var_pop?: Maybe<Journey_Location_Var_Pop_Fields>;
  var_samp?: Maybe<Journey_Location_Var_Samp_Fields>;
  variance?: Maybe<Journey_Location_Variance_Fields>;
};


/** aggregate fields of "journey_location" */
export type Journey_Location_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Journey_Location_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "journey_location" */
export type Journey_Location_Aggregate_Order_By = {
  avg?: InputMaybe<Journey_Location_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Journey_Location_Max_Order_By>;
  min?: InputMaybe<Journey_Location_Min_Order_By>;
  stddev?: InputMaybe<Journey_Location_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Journey_Location_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Journey_Location_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Journey_Location_Sum_Order_By>;
  var_pop?: InputMaybe<Journey_Location_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Journey_Location_Var_Samp_Order_By>;
  variance?: InputMaybe<Journey_Location_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "journey_location" */
export type Journey_Location_Arr_Rel_Insert_Input = {
  data: Array<Journey_Location_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Journey_Location_On_Conflict>;
};

/** aggregate avg on columns */
export type Journey_Location_Avg_Fields = {
  __typename?: 'journey_location_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "journey_location" */
export type Journey_Location_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "journey_location". All fields are combined with a logical 'AND'. */
export type Journey_Location_Bool_Exp = {
  _and?: InputMaybe<Array<Journey_Location_Bool_Exp>>;
  _not?: InputMaybe<Journey_Location_Bool_Exp>;
  _or?: InputMaybe<Array<Journey_Location_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  journey_id?: InputMaybe<String_Comparison_Exp>;
  location?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "journey_location" */
export enum Journey_Location_Constraint {
  /** unique or primary key constraint on columns "id" */
  JourneyLocationPkey = 'journey_location_pkey'
}

/** input type for incrementing numeric columns in table "journey_location" */
export type Journey_Location_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "journey_location" */
export type Journey_Location_Insert_Input = {
  id?: InputMaybe<Scalars['Int']>;
  journey_id?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Journey_Location_Max_Fields = {
  __typename?: 'journey_location_max_fields';
  id?: Maybe<Scalars['Int']>;
  journey_id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "journey_location" */
export type Journey_Location_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  journey_id?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Journey_Location_Min_Fields = {
  __typename?: 'journey_location_min_fields';
  id?: Maybe<Scalars['Int']>;
  journey_id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "journey_location" */
export type Journey_Location_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  journey_id?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "journey_location" */
export type Journey_Location_Mutation_Response = {
  __typename?: 'journey_location_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Journey_Location>;
};

/** on_conflict condition type for table "journey_location" */
export type Journey_Location_On_Conflict = {
  constraint: Journey_Location_Constraint;
  update_columns?: Array<Journey_Location_Update_Column>;
  where?: InputMaybe<Journey_Location_Bool_Exp>;
};

/** Ordering options when selecting data from "journey_location". */
export type Journey_Location_Order_By = {
  id?: InputMaybe<Order_By>;
  journey_id?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** primary key columns input for table: journey_location */
export type Journey_Location_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "journey_location" */
export enum Journey_Location_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  JourneyId = 'journey_id',
  /** column name */
  Location = 'location',
  /** column name */
  Timestamp = 'timestamp'
}

/** input type for updating data in table "journey_location" */
export type Journey_Location_Set_Input = {
  id?: InputMaybe<Scalars['Int']>;
  journey_id?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Journey_Location_Stddev_Fields = {
  __typename?: 'journey_location_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "journey_location" */
export type Journey_Location_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Journey_Location_Stddev_Pop_Fields = {
  __typename?: 'journey_location_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "journey_location" */
export type Journey_Location_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Journey_Location_Stddev_Samp_Fields = {
  __typename?: 'journey_location_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "journey_location" */
export type Journey_Location_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "journey_location" */
export type Journey_Location_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Journey_Location_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Journey_Location_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['Int']>;
  journey_id?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate sum on columns */
export type Journey_Location_Sum_Fields = {
  __typename?: 'journey_location_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "journey_location" */
export type Journey_Location_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** update columns of table "journey_location" */
export enum Journey_Location_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  JourneyId = 'journey_id',
  /** column name */
  Location = 'location',
  /** column name */
  Timestamp = 'timestamp'
}

export type Journey_Location_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Journey_Location_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Journey_Location_Set_Input>;
  /** filter the rows which have to be updated */
  where: Journey_Location_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Journey_Location_Var_Pop_Fields = {
  __typename?: 'journey_location_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "journey_location" */
export type Journey_Location_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Journey_Location_Var_Samp_Fields = {
  __typename?: 'journey_location_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "journey_location" */
export type Journey_Location_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Journey_Location_Variance_Fields = {
  __typename?: 'journey_location_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "journey_location" */
export type Journey_Location_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate max on columns */
export type Journey_Max_Fields = {
  __typename?: 'journey_max_fields';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Journey_Min_Fields = {
  __typename?: 'journey_min_fields';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "journey" */
export type Journey_Mutation_Response = {
  __typename?: 'journey_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Journey>;
};

/** on_conflict condition type for table "journey" */
export type Journey_On_Conflict = {
  constraint: Journey_Constraint;
  update_columns?: Array<Journey_Update_Column>;
  where?: InputMaybe<Journey_Bool_Exp>;
};

/** Ordering options when selecting data from "journey". */
export type Journey_Order_By = {
  id?: InputMaybe<Order_By>;
  journey_locations_aggregate?: InputMaybe<Journey_Location_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: journey */
export type Journey_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "journey" */
export enum Journey_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "journey" */
export type Journey_Set_Input = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "journey" */
export type Journey_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Journey_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Journey_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

/** update columns of table "journey" */
export enum Journey_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

export type Journey_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Journey_Set_Input>;
  /** filter the rows which have to be updated */
  where: Journey_Bool_Exp;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "journey" */
  delete_journey?: Maybe<Journey_Mutation_Response>;
  /** delete single row from the table: "journey" */
  delete_journey_by_pk?: Maybe<Journey>;
  /** delete data from the table: "journey_location" */
  delete_journey_location?: Maybe<Journey_Location_Mutation_Response>;
  /** delete single row from the table: "journey_location" */
  delete_journey_location_by_pk?: Maybe<Journey_Location>;
  /** insert data into the table: "journey" */
  insert_journey?: Maybe<Journey_Mutation_Response>;
  /** insert data into the table: "journey_location" */
  insert_journey_location?: Maybe<Journey_Location_Mutation_Response>;
  /** insert a single row into the table: "journey_location" */
  insert_journey_location_one?: Maybe<Journey_Location>;
  /** insert a single row into the table: "journey" */
  insert_journey_one?: Maybe<Journey>;
  /** update data of the table: "journey" */
  update_journey?: Maybe<Journey_Mutation_Response>;
  /** update single row of the table: "journey" */
  update_journey_by_pk?: Maybe<Journey>;
  /** update data of the table: "journey_location" */
  update_journey_location?: Maybe<Journey_Location_Mutation_Response>;
  /** update single row of the table: "journey_location" */
  update_journey_location_by_pk?: Maybe<Journey_Location>;
  /** update multiples rows of table: "journey_location" */
  update_journey_location_many?: Maybe<Array<Maybe<Journey_Location_Mutation_Response>>>;
  /** update multiples rows of table: "journey" */
  update_journey_many?: Maybe<Array<Maybe<Journey_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_JourneyArgs = {
  where: Journey_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Journey_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Journey_LocationArgs = {
  where: Journey_Location_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Journey_Location_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootInsert_JourneyArgs = {
  objects: Array<Journey_Insert_Input>;
  on_conflict?: InputMaybe<Journey_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Journey_LocationArgs = {
  objects: Array<Journey_Location_Insert_Input>;
  on_conflict?: InputMaybe<Journey_Location_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Journey_Location_OneArgs = {
  object: Journey_Location_Insert_Input;
  on_conflict?: InputMaybe<Journey_Location_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Journey_OneArgs = {
  object: Journey_Insert_Input;
  on_conflict?: InputMaybe<Journey_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_JourneyArgs = {
  _set?: InputMaybe<Journey_Set_Input>;
  where: Journey_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Journey_By_PkArgs = {
  _set?: InputMaybe<Journey_Set_Input>;
  pk_columns: Journey_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Journey_LocationArgs = {
  _inc?: InputMaybe<Journey_Location_Inc_Input>;
  _set?: InputMaybe<Journey_Location_Set_Input>;
  where: Journey_Location_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Journey_Location_By_PkArgs = {
  _inc?: InputMaybe<Journey_Location_Inc_Input>;
  _set?: InputMaybe<Journey_Location_Set_Input>;
  pk_columns: Journey_Location_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Journey_Location_ManyArgs = {
  updates: Array<Journey_Location_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Journey_ManyArgs = {
  updates: Array<Journey_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "journey" */
  journey: Array<Journey>;
  /** fetch aggregated fields from the table: "journey" */
  journey_aggregate: Journey_Aggregate;
  /** fetch data from the table: "journey" using primary key columns */
  journey_by_pk?: Maybe<Journey>;
  /** fetch data from the table: "journey_location" */
  journey_location: Array<Journey_Location>;
  /** fetch aggregated fields from the table: "journey_location" */
  journey_location_aggregate: Journey_Location_Aggregate;
  /** fetch data from the table: "journey_location" using primary key columns */
  journey_location_by_pk?: Maybe<Journey_Location>;
};


export type Query_RootJourneyArgs = {
  distinct_on?: InputMaybe<Array<Journey_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Journey_Order_By>>;
  where?: InputMaybe<Journey_Bool_Exp>;
};


export type Query_RootJourney_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Journey_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Journey_Order_By>>;
  where?: InputMaybe<Journey_Bool_Exp>;
};


export type Query_RootJourney_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootJourney_LocationArgs = {
  distinct_on?: InputMaybe<Array<Journey_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Journey_Location_Order_By>>;
  where?: InputMaybe<Journey_Location_Bool_Exp>;
};


export type Query_RootJourney_Location_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Journey_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Journey_Location_Order_By>>;
  where?: InputMaybe<Journey_Location_Bool_Exp>;
};


export type Query_RootJourney_Location_By_PkArgs = {
  id: Scalars['Int'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "journey" */
  journey: Array<Journey>;
  /** fetch aggregated fields from the table: "journey" */
  journey_aggregate: Journey_Aggregate;
  /** fetch data from the table: "journey" using primary key columns */
  journey_by_pk?: Maybe<Journey>;
  /** fetch data from the table: "journey_location" */
  journey_location: Array<Journey_Location>;
  /** fetch aggregated fields from the table: "journey_location" */
  journey_location_aggregate: Journey_Location_Aggregate;
  /** fetch data from the table: "journey_location" using primary key columns */
  journey_location_by_pk?: Maybe<Journey_Location>;
  /** fetch data from the table in a streaming manner: "journey_location" */
  journey_location_stream: Array<Journey_Location>;
  /** fetch data from the table in a streaming manner: "journey" */
  journey_stream: Array<Journey>;
};


export type Subscription_RootJourneyArgs = {
  distinct_on?: InputMaybe<Array<Journey_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Journey_Order_By>>;
  where?: InputMaybe<Journey_Bool_Exp>;
};


export type Subscription_RootJourney_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Journey_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Journey_Order_By>>;
  where?: InputMaybe<Journey_Bool_Exp>;
};


export type Subscription_RootJourney_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootJourney_LocationArgs = {
  distinct_on?: InputMaybe<Array<Journey_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Journey_Location_Order_By>>;
  where?: InputMaybe<Journey_Location_Bool_Exp>;
};


export type Subscription_RootJourney_Location_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Journey_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Journey_Location_Order_By>>;
  where?: InputMaybe<Journey_Location_Bool_Exp>;
};


export type Subscription_RootJourney_Location_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootJourney_Location_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Journey_Location_Stream_Cursor_Input>>;
  where?: InputMaybe<Journey_Location_Bool_Exp>;
};


export type Subscription_RootJourney_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Journey_Stream_Cursor_Input>>;
  where?: InputMaybe<Journey_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

export type InsertLocationMutationVariables = Exact<{
  l: Journey_Location_Insert_Input;
}>;


export type InsertLocationMutation = { __typename?: 'mutation_root', insert_journey_location?: { __typename?: 'journey_location_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'journey_location', id: number, journey_id: string, location: string, timestamp: any }> } | null };


export const InsertLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"l"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"journey_location_insert_input"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_journey_location"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"l"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affected_rows"}},{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"journey_id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]}}]} as unknown as DocumentNode<InsertLocationMutation, InsertLocationMutationVariables>;