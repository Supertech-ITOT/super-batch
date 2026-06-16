export const queryKeys = {
    plants: ["plants"] as const,
    plant: (id: number) => ["plants", id] as const,

    areas: ["areas"] as const,
    area: (id: number) => ["areas", id] as const,
    areasByPlant: (plantId: number) => ["areas", "plant", plantId] as const,

    units: ["units"] as const,
    unit: (id: number) => ["units", id] as const,
    unitsByArea: (areaId: number) => ["units", "area", areaId] as const,

    equipments: ["equipments"] as const,
    equipment: (id: number) => ["equipments", id] as const,
    equipmentsByUnit: (unitId: number) => ["equipments", "unit", unitId] as const,

    materials: ["materials"] as const,
    material: (id: number) => ["materials", id] as const,

    parameters: ["parameters"] as const,
    parameter: (id: number) => ["parameters", id] as const,

    actions: ["actions"] as const,
    action: (id: number) => ["actions", id] as const,

    transitions: ["transitions"] as const,
    transition: (id: number) => ["transitions", id] as const,

    messages: ["messages"] as const,
    message: (id: number) => ["messages", id] as const,

    plantHierarchy: ["plant-hierarchy"] as const,
};