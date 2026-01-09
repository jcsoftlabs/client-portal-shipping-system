export const HAITI_COMMUNES: Record<string, string[]> = {
    'Ouest': [
        'Port-au-Prince',
        'Delmas',
        'Pétion-Ville',
        'Carrefour',
        'Croix-des-Bouquets',
        'Tabarre',
        'Cité Soleil',
        'Kenscoff',
        'Gressier',
        'Arcahaie',
        'Cabaret',
        'Thomazeau',
        'Ganthier',
        'Cornillon',
        'Fonds-Verrettes',
        'Grand-Goâve',
        'Petit-Goâve',
        'Léogâne',
    ],
    'Artibonite': [
        'Gonaïves',
        'Saint-Marc',
        'Dessalines',
        'Gros-Morne',
        'Ennery',
        'Verrettes',
    ],
    'Nord': [
        'Cap-Haïtien',
        'Quartier-Morin',
        'Limonade',
        'Acul-du-Nord',
        'Plaine-du-Nord',
        'Milot',
    ],
    'Sud': [
        'Les Cayes',
        'Port-Salut',
        'Aquin',
        'Saint-Louis-du-Sud',
        'Chantal',
        'Torbeck',
    ],
};

export type HaitiDepartment = keyof typeof HAITI_COMMUNES;
export type HaitiCommune = typeof HAITI_COMMUNES[HaitiDepartment][number];
