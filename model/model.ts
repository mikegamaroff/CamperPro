export type Document = {
	_id?: string;
	_rev?: string;
	created_at?: string;
	updated_at?: string;
};

export const FeedbackTypesLookup = {
	user: 'User'
} as const;

export const DocumentTypesLookup = {
	userLogin: 'User'
} as const;

export function objectEquals(a: Document | null | undefined, b: Document | null | undefined): boolean {
	if (!a || !b) return false;
	return a._id === b._id;
}
export interface DocumentWithImages extends Document {
	images?: Array<{ id: string; contentType: string }>;
}
