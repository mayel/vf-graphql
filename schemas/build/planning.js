
// Generated by scripts/build.js - edit the *.gql file instead!

module.exports = `
##
#
# Planning layer
#
# Allows agents to coordinate economic activity by agreeing on a series of
# future events to be undertaken.
#
#
##

union EventOrCommitment = EconomicEvent | Commitment

"""
A planned economic flow that has been promised by an agent to another agent.
"""
type Commitment {
  id: ID!

  "Relates a process input or output to a verb, such as consume, produce, work, improve, etc."
  action: Action

  "A \`Process\` or \`Transfer\` which this \`Commitment\` will aid in the finalisation of."
  inputOf: EconomicActivity

  "A \`Process\` or \`Transfer\` which this \`Commitment\` has been generated as a result of."
  outputOf: EconomicActivity

  "The economic agent from whom the intended, committed, or actual economic event is initiated."
  provider: Agent

  "The economic agent whom the intended, committed, or actual economic event is for."
  receiver: Agent

  "References a concept in a common taxonomy or other classification scheme for purposes of categorization."
  resourceClassifiedAs: [URL!]

  "The primary resource knowledge specification or definition of an existing or potential resource."
  resourceConformsTo: ResourceSpecification

  "Economic resource involved in the flow."
  resourceInventoriedAs: EconomicResource

  quantifiedAs: QuantityValue

  "Specific time marking the exact beginning of flow or process"
  hasBeginning: DateTime
  "Specific time marking the exact end of flow or process"
  hasEnd: DateTime

  "Specific time marking the exact moment at which the flow or process occurred"
  hasPointInTime: DateTime

  "Indicates the flow or process occurred prior to this specific time"
  before: DateTime
  "Indicates the flow or process occurred after this specific time"
  after: DateTime

  finished: Boolean

  # deletable: Boolean

  # isPlanDeliverable: Boolean #TODO: define in VF?
  # forPlanDeliverable: Commitment #TODO: define in VF?

  "The place where a commitment occurs.  Usually mappable."
  atLocation: Location

  note: String

  "Grouping around something to create a boundary or context, used for documenting, accounting, planning."
  inScopeOf: [AnyType!]

  "Reference to an agreement between agents which specifies the rules or policies or calculations which govern this flow."
  under: AnyAgreement
  "This commitment is part of the agreement, which could not exist without it."
  clauseOf: Agreement

  ##############################################################################
  # inverse relationships and queries

  "The economic event which completely or partially fulfills a commitment."
  fulfilledBy: [Fulfillment!]
  # fulfilledBy(requestDistribution: Boolean): [Fulfillment!]

  involvedAgents: [Agent!]

  plan: Plan
}

"""
A planned economic flow, which can lead to economic events (sometimes through commitments).
"""
type Intent {
  id: ID!

  "Relates a process input or output to a verb, such as consume, produce, work, improve, etc."
  action: Action!

  "A \`Process\` or \`Transfer\` to which this \`Intent\` is hoping to contribute towards."
  inputOf: EconomicActivity

  "A \`Process\` or \`Transfer\` which this \`Intent\` will eventuate as a result of."
  outputOf: EconomicActivity

  "The economic agent from whom the intended, committed, or actual economic event is initiated."
  provider: Agent

  "The economic agent whom the intended, committed, or actual economic event is for."
  receiver: Agent

  "References a concept in a common taxonomy or other classification scheme for purposes of categorization."
  resourceClassifiedAs: [URL!]

  "The primary resource knowledge specification or definition of an existing or potential resource."
  resourceConformsTo: ResourceSpecification

  "When a specific \`EconomicResource\` is known which can service the \`Intent\`, this defines that resource."
  resourceInventoriedAs: EconomicResource

  quantifiedAs: QuantityValue

  "Specific time marking the exact beginning of flow or process"
  hasBeginning: DateTime
  "Specific time marking the exact end of flow or process"
  hasEnd: DateTime

  "Specific time marking the exact moment at which the flow or process occurred"
  hasPointInTime: DateTime

  "Indicates the flow or process occurred prior to this specific time"
  before: DateTime
  "Indicates the flow or process occurred after this specific time"
  after: DateTime

  finished: Boolean

  "The place where an intent would occur.  Usually mappable."
  atLocation: Location

  # deletable: Boolean

  image: URL

  note: String

  "Grouping around something to create a boundary or context, used for documenting, accounting, planning."
  inScopeOf: [AnyType!]

  "Reference to an agreement between agents which specifies the rules or policies or calculations which govern this flow."
  under: AnyAgreement

  ##############################################################################
  # inverse relationships and queries

  satisfiedBy: [Satisfaction!]
}

"""
A claim for a future economic event(s) in reciprocity for an economic event that already occurred.
"""
type Claim {
  id: ID!

  "Relates a process input or output to a verb, such as consume, produce, work, improve, etc."
  action: Action

  "The economic agent from whom the intended, committed, or actual economic event is initiated."
  provider: Agent!

  "The economic agent whom the intended, committed, or actual economic event is for."
  receiver: Agent!

  "References a concept in a common taxonomy or other classification scheme for purposes of categorization."
  resourceClassifiedAs: [URL!]

  "The primary resource knowledge specification or definition of an existing or potential resource."
  resourceConformsTo: ResourceSpecification

  "The amount of the claimed resource desired by the claim."
  claimedQuantity: QuantityValue

  "The economic event which already occurred which this claim has been made against."
  triggeredBy: EconomicEvent!

  "Indicates that the claim must be filled before the given date."
  before: DateTime

  "The data on which the claim was made."
  created: DateTime

  finished: Boolean
  note: String

  "Reference to an agreement between agents which specifies the rules or policies or calculations which govern this flow."
  under: AnyAgreement
}

"""
The quantity that the economic event fulfilled towards the commitment.
"""
type Fulfillment {
  id: ID!

  "The economic event which completely or partially fulfills a commitment."
  fulfilledBy: EconomicEvent!

  "The commitment which is completely or partially fulfilled by an economic event."
  fulfills: Commitment!

  "The quantity of the fulfillment of an event towards a commitment or an intent."
  fulfilledQuantity: QuantityValue

  note: String

}

"""
A commitment or economic event that partially or fully satisfies an intent.
"""
type Satisfaction {
  id: ID!

  "An intent satisfied fully or partially by an economic event or commitment."
  satisfies: Intent!

  "A commitment or economic event fully or partially satisfying an intent."
  satisfiedBy: EventOrCommitment!

  "The quantity of the satisfaction of an commitment towards an intent."
  satisfiedQuantity: QuantityValue

  note: String
}

"""
The quantity that the economic event settled of the claim.
"""
type Settlement {
  id: ID!

  "A \`Claim\` which is fully or partially settled by an \`EconomicEvent\`."
  settles: Claim!

  "The \`EconomicEvent\` fully or partially settling a \`Claim\`."
  settledBy: EconomicEvent!

  "The quantity of the settlement of an \`EconomicEvent\` towards a \`Claim\`."
  settledQuantity: QuantityValue

  note: String
}


"Query parameters for reading \`Process\`es related to a \`Plan\`"
input planProcessSearchParams {
  searchString: String
  startDate: DateTime
  endDate: DateTime
  finished: Boolean
}

type Plan { #TODO: this is not yet in VF, and may or may not be named Plan
  id: ID!
  plannedOn: String
  due: String
  note: String
  name: String

  "Grouping around something to create a boundary or context, used for documenting, accounting, planning."
  inScopeOf: [AnyType!]

  # createdBy: Agent
  processes(filter: planProcessSearchParams): [Process!]
  workingAgents: [Agent!]
  plannedNonWorkInputs: [Commitment!]
  plannedOutputs: [Commitment!]
  nonWorkInputs: [EconomicEvent!]
  outputs: [EconomicEvent!]
  kanbanState: String #TODO: codify this?
  # deletable: Boolean
}

"""
Any type of agreement among economic agents.
"""
type Agreement {
  id: ID!
  name: String
  created: DateTime
  note: String

  ##############################################################################
  # inverse relationships and queries

  commitments: [Commitment!]
  economicEvents: [EconomicEvent!]
  involvedAgents: [Agent!]
}

"""
A reference to some external agreement between agents which specifies the rules
or policies or calculations which govern a flow.
"""
type ReferencedAgreement {
  id: URL!
}

"""
References either an agreement formally managed by \`Commitment\`s & \`EconomicEvent\`s,
or an external agreement which is loosely held to govern resource flows.
"""
union AnyAgreement = Agreement | ReferencedAgreement

`

