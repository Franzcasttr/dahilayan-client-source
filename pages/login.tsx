import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  // session && router.push('/');

  const handleSignIn = () =>
    router.push(`auth/signin?callbackUrl=${router.asPath}`);
  if (session) {
    return (
      <>
        Signed in as {session?.user.name} <br />
        <button onClick={() => signOut({ redirect: false, callbackUrl: '/' })}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <div className='section-center'>
      Not signed in <br />
      <button onClick={handleSignIn}>Sign in</button>
      <p className='mt-40'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
        facere numquam, similique modi maiores nulla accusantium dolorum ab
        quasi? Fuga praesentium odio dicta, necessitatibus omnis voluptatum
        placeat obcaecati commodi natus voluptatibus officiis eaque ex, minima
        nostrum expedita. Rem excepturi vel, odit sed voluptate iure earum
        delectus harum consequatur autem, accusantium soluta illum facilis.
        Dignissimos delectus consectetur, error ab soluta veritatis nobis qui
        cupiditate pariatur dolore reprehenderit esse consequuntur itaque?
        Expedita repellendus, dignissimos, adipisci esse aliquam, at voluptatum
        nostrum inventore nesciunt aliquid ducimus iure culpa delectus eveniet
        magni sit commodi hic consequatur. Deserunt blanditiis tenetur sunt
        accusantium iure vitae minus recusandae quas. Neque accusamus mollitia
        ipsa. Similique corporis, quibusdam exercitationem quod, porro
        laudantium illo, iste eius beatae quisquam corrupti possimus quae
        ducimus facere labore quos quis. Sequi eius facilis cupiditate animi
        consectetur in, nam distinctio maiores, quasi, repudiandae amet officiis
        corrupti! Autem eius itaque temporibus, quae fugit vitae numquam magnam
        nobis nisi magni molestias mollitia odit, voluptatum maxime provident
        unde saepe sed porro id quis voluptate veritatis, similique tempore.
        Rerum, minima eum? Facere voluptates, ea magnam possimus sed eos odio
        esse, porro quo explicabo ipsum aliquam repellendus quos quidem.
        Dolorum, dolores cupiditate praesentium reprehenderit in eligendi fugiat
        quo nulla deleniti itaque a provident aspernatur atque pariatur
        necessitatibus aliquam! At sed, qui harum optio aliquam recusandae et
        dolores esse natus voluptatum asperiores aperiam laudantium
        reprehenderit nam aliquid unde. Aliquid aspernatur iste deserunt eos
        exercitationem necessitatibus quam consequuntur non sint quibusdam
        voluptas praesentium officiis officia nulla, et repellat eius facere
        autem saepe ducimus quisquam? Doloribus tenetur atque in, quis illo
        perferendis iste odit fugit! Ad dicta, vero vel, expedita fugit nesciunt
        blanditiis exercitationem, libero doloribus animi quo! Voluptatibus
        nostrum, magni vitae aperiam eveniet accusantium, repellendus aut
        architecto, officiis ratione numquam doloremque explicabo praesentium
        eligendi! Quis sit debitis reprehenderit esse consequatur! Ut recusandae
        dolore dolores libero quod repellendus aperiam porro commodi, aliquid
        sunt incidunt nesciunt architecto voluptatibus quam pariatur
        reprehenderit voluptas tempore voluptatum cupiditate fugit aspernatur?
        Accusamus necessitatibus dolores illum cum qui doloremque dicta odit
        deleniti suscipit sequi nemo quia, cumque harum eveniet delectus
        asperiores maiores quisquam mollitia eaque adipisci exercitationem!
        Atque fugiat sequi consectetur. Numquam expedita accusamus ad odio quod
        omnis vitae perspiciatis magnam voluptatem dignissimos deserunt beatae
        nesciunt excepturi laborum porro, optio cupiditate fugiat quos nihil
        minima ut, vel obcaecati architecto. Voluptates cupiditate pariatur,
        enim tenetur aspernatur at minus itaque rem harum. Quasi quam adipisci
        rem omnis officiis delectus voluptatem, voluptatibus est quaerat, quis
        ipsam non, eveniet ullam! Eligendi ipsa optio ut ex incidunt quod dolor.
        Magnam, nisi a. A distinctio asperiores, sit laboriosam at velit vero
        quisquam voluptates esse officia possimus cum nulla, maiores dolore
        beatae? Voluptatum iste quae, eos libero incidunt omnis molestiae
        praesentium nobis quia. Veniam iste laudantium culpa inventore?
        Consequuntur, deserunt omnis! Possimus iste dignissimos, accusantium
        architecto consequuntur mollitia error qui. Voluptatum in autem fugiat
        nesciunt, quibusdam cum, unde beatae provident sunt error labore facere.
        Nesciunt exercitationem, dolorum voluptatum expedita consequatur,
        necessitatibus deserunt dolore voluptates, maiores similique magnam
        consectetur ipsam dicta modi recusandae ex non amet debitis nulla!
      </p>
    </div>
  );
};

export default Login;
