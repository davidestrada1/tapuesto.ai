export interface Market {
    id: string;
    title: string;
    img: string;
    tag: string;
    tagColor: string;
    yes: number;
    no: number;
    volume: string;
    expiry: string;
}

export interface GroundingSource {
    title: string;
    uri: string;
}

export interface AIAnalysisResult {
    suggestion: string;
    reasoning: string;
    sources: GroundingSource[];
}

export interface User {
    nickname: string;
    balance: string;
    elo: number;
    winRate: number;
    avatar: string;
}

export type BetType = '1v1' | 'poll';
export type StakeType = 'money' | 'custom';
export type ProofType = 'photo' | 'video' | 'link' | 'voucher';

export interface CreateMarketForm {
    betType: BetType;
    topic: string;
    stakeType: StakeType;
    stakeAmount: string; // Cash amount or Description of item (e.g., "Botella Blue Label")
    downPayment: string;
    currency: string;
    deadline: string;
    proofType: ProofType;
    dataSourceUrl: string;
}

export interface Profile {
    id: string;
    nickname: string | null;
    avatar_url: string | null;
    updated_at: string | null;
}

export interface Routine {
    id: string;
    user_id: string;
    name: string;
    description: string | null;
    created_at: string;
}

export interface Activity {
    id: string;
    user_id: string;
    name: string;
    description: string | null;
    created_at: string;
}

export interface Action {
    id: string;
    user_id: string;
    activity_id: string | null;
    routine_id: string | null;
    notes: string | null;
    completed_at: string;
    created_at: string;
}