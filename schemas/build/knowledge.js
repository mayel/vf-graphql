
// Generated by scripts/build.js - edit the *.gql file instead!

module.exports = `
##
#
# Knowledge layer
#
# Provides functionality for classifying and organising other parts of the system, including recipes.
#
# :TODO: need to figure out a way of making these enums extensible while
#        still validating implementations
#
##


"""
An action verb defining the kind of event, commitment, or intent.
It is recommended that the lowercase action verb should be used as the record ID
in order that references to \`Action\`s elsewhere in the system are easily readable.
"""
type Action {
  id: ID!
  name: String!
  resourceEffect: String! # "+", "-", "0"
}

# Core VF action IDs & \`resourceEffect\`s:
# @see https://github.com/valueflows/valueflows/issues/487
#   unload    (+) transported resource leaves the process, the same resource will appear in input with vf:load verb
#   load      (-) transported resource enters the process, the same resource will appear in output with vf:unload verb
#   consume   (-) for example an ingredient composed into the output, after the process the ingredient is gone
#   use       (0) for example a tool used in process, after the process, the tool still exists
#   work      (0) labor power towards a process
#   cite      (0) for example a design file, neither used nor consumed, the file remains available at all times
#   produce   (+) new resource created in that process or an existing stock resource added to
#   accept    (0) in processes like repair or maintentance, the same resource will appear in output with vf:improve verb
#   improve   (0) in processes like repair or maintentance, the same resource will appear in input with vf:accept verb
#   give      (-) give rights and responsibilities for the resource
#   receive   (+) receive rights and responsibilites for the resource
#   raise     (+) adjusts a quantity up based on a beginning balance or inventory count
#   lower     (-) adjusts a quantity down based on a beginning balance or inventory count

"""
Specification of a kind of resource. Could define a material item, service, digital item, currency account, etc.
Used instead of a classification when more information is needed, particularly for recipes.
"""
type ResourceSpecification {
  id: ID!
  name: String!

  "The unit expected for this resource specification as a default."
  unit: Unit

  "Defines if any resource of that type can be freely substituted for any other resource of that type when used, consumed, traded, etc."
  substitutable: Boolean

  image: URI

  note: String

  "References a concept in a common taxonomy or other classification scheme for purposes of categorization."
  resourceClassifiedAs: [URI!]

  ##############################################################################
  # inverse relationships and queries

  conformingResources: [EconomicResource!]
}

"""
The linkage between a recipe process, an action that structures a recipe, and a resource specification.
"""
type RecipeFlow {
  id: ID!
  quantifiedAs: QuantityValue

  "The primary resource knowledge specification or definition of an existing or potential resource."
  resourceConformsTo: ResourceSpecification

  "References a concept in a common taxonomy or other classification scheme for purposes of categorization."
  resourceClassifiedAs: [URI!]

  "Relates a process input or output to a verb, such as consume, produce, work, improve, etc."
  action: Action!

  "Relates an input flow to it's node in a recipe."
  recipeInputOf: RecipeProcess

  "Relates an output flow to it's node in a recipe."
  recipeOutputOf: RecipeProcess

  note: String
}

"""
Specifies the process part of a recipe for use in planning from recipe.
"""
type RecipeProcess {
  id: ID!
  name: String!

  hasDuration: Duration

  "The multiplier for duration based on capacities for the recipe."
  durationMultiplier: Float

  # Process classifications under review.
  # You are probably looking for a "skill RecipeFlow" provided to the process as a 'work' input.
  # @see https://github.com/valueflows/vf-graphql/issues/25#issuecomment-489429982
  # "References a concept in a common taxonomy or other classification scheme for purposes of categorization."
  # processClassifiedAs: [URI!]

  note: String

  "Grouping around something to create a boundary or context, used for documenting, accounting, planning."
  inScopeOf: Agent
}

`

