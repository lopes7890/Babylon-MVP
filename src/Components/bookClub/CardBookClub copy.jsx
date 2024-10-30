import React from 'react';
import styles from './css/CardBookClub.module.css';

export default function CardBookClub({ dados }) {
  console.log(dados);
  const bookClub = dados;

  //  foto_club: 'foto teste';
  //  idClub: 2;
  //  link_club: 'Link teste';
  //  nomeClub: 'nome teste';

  return (
    <div key={bookClub.idClub}>
      <div className={styles.clubInfo}>
        <div className={styles.clubBook}>
          <p>clube: {bookClub.nomeClub}</p>
          <div>
            <div className={styles.bookCover}></div>
          </div>
        </div>
        <div className={styles.clubMembers}>
          <p>Integrantes:</p>
          <ul>
            {bookClub.members?.length > 0 ? (
              bookClub.members.map((member, index) => (
                <li key={index}>
                  <span
                    className={`${styles.icon} ${styles[`member${index + 1}`]}`}
                  ></span>{' '}
                  {member.nome}
                </li>
              ))
            ) : (
              <p>Não hà membros nesse clube</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
