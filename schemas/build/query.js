
// Generated by scripts/build.js - edit the *.gql file instead!

module.exports = `
##
#
# Main query entrypoint
#
#
##

type Query {

  # Agent module
  myAgent: Agent
  agent(id: ID): Agent
  allAgents: [Agent!]

  organization(id: ID): Organization
  allOrganizations: [Organization!]

  person(id: ID): Person
  allPeople: [Person!]

  agentRelationship(id: ID): AgentRelationship
  allAgentRelationships: [AgentRelationship!]
  agentRelationshipRole(id: ID): AgentRelationshipRole
  allAgentRelationshipRoles: [AgentRelationshipRole!]

  # Observation layer
  economicEvent(id: ID): EconomicEvent
  allEconomicEvents: [EconomicEvent!]
  filteredEconomicEvents(
    providerId: ID,
    receiverId: ID,
    resourceClassifiedAs: [URL!],
    action: ID,
    startDate: String,
    endDate: String
  ): [EconomicEvent!]

  fulfillment(id: ID): Fulfillment
  allFulfillments: [Fulfillment!]

  economicResource(id: ID): EconomicResource
  allEconomicResources: [EconomicResource!]

  #validation(id: ID): Validation
  #allValidations: [Validation!]

  process(id: ID): Process
  allProcesses: [Process!]

  transfer(id: ID): Transfer
  allTransfers: [Transfer!]

  # Planning layer
  # allRecipes: [Recipe!]

  commitment(id: ID): Commitment
  allCommitments: [Commitment!]

  satisfaction(id: ID): Satisfaction
  allSatisfactions: [Satisfaction!]

  plan(id: ID): Plan
  allPlans: [Plan!]

  agreement(id: ID): Agreement
  allAgreements: [Agreement!]

  # Knowledge layer
  # resourceClassification(id: ID): ResourceClassification
  # allResourceClassifications: [ResourceClassification!]
  # # resourceClassificationsByProcessCategory(category: EconomicResourceProcessCategory): [ResourceClassification!]
  # resourceClassificationsByAction(action: Action): [ResourceClassification!]
  # resourceClassificationsByFacetValues(facetValues: String): [ResourceClassification!]

  # agentResourceClassification(id: ID): AgentResourceClassification
  # allAgentResourceClassifications: [AgentResourceClassification!]

  # processClassification(id: ID): ProcessClassification
  # allProcessClassifications: [ProcessClassification!]

  # organizationClassification(id: ID): OrganizationClassification
  # allOrganizationClassifications: [OrganizationClassification!]

  resourceSpecification(id: ID): ResourceSpecification
  allResourceSpecifications: [ResourceSpecification!]

  recipeProcess(id: ID): RecipeProcess
  allRecipeProcesses: [RecipeProcess!]

  recipeFlow(id: ID): RecipeFlow
  allRecipeFlows: [RecipeFlow!]

  action(id: ID): Action
  allActions: [Action!]

  #facet(id: ID): Facet
  #allFacets: [Facet!]

  # System config layer
  unit(id: ID): Unit
  allUnits: [Unit!]

  quantityValue(id: ID): QuantityValue

  location(id: ID): Location #TODO: ??
  allLocations: [Location!] #TODO: ??

}

`

