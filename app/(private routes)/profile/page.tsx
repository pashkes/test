// app/(private routes)/profile/page.tsx

import Link from 'next/link';
import { getServerMe } from '@/lib/api/serverApi';

const Profile = async () => {
  const user = await getServerMe();

  return (
    <section>
      <div>
        <h1>My Profile</h1>
        <Link href="/profile/edit">Edit profile</Link>
      </div>
      <div>
        <h2>Name: {user.userName}</h2>
        <h2>Email: {user.email}</h2>
        <p>
          Some description: Lorem ipsum dolor sit amet consectetur adipisicing
          elit...
        </p>
      </div>
    </section>
  );
};

export default Profile;
