import { User } from '../../model/user';
import createDbInstance from '../../util/camperprodb';
import { isCouchDbError } from '../../util/isCouchDbError';
export async function getUserByEmail(email: string): Promise<User | null> {
	const db = createDbInstance();
	const response = await db.view('user-view', 'all-users', { key: email });

	if (isCouchDbError(response)) {
		console.error('CouchDB error:', response);
		throw new Error('Internal server error');
	}

	const rows = response.rows as Array<{ value: User }>;
	return rows.length > 0 ? rows[0].value : null;
}
