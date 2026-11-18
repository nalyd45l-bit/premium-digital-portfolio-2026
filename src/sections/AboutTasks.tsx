import {BarChart3,CreditCard,Database,Handshake,Settings2,Warehouse} from 'lucide-react';

const tasks=[
  {title:'Сопровождение сервисных партнёров',Icon:Handshake},
  {title:'Качество и сверка данных',Icon:Database},
  {title:'Учёт ККТ, ФН и SIM-карт',Icon:CreditCard},
  {title:'Мониторинг оборудования и складов',Icon:Warehouse},
  {title:'Аналитика и прогнозирование',Icon:BarChart3},
  {title:'Цифровые инструменты и автоматизация',Icon:Settings2},
] as const;

export function AboutTasks(){return <section className="about-tasks" aria-labelledby="about-title"><div className="wrap"><div className="about-heading"><span className="eyebrow"><span className="tiny-line"/>ПРОФЕССИОНАЛЬНЫЙ ПРОФИЛЬ</span><h2 id="about-title">Обо мне. Человек за проектами.</h2></div><div className="task-lens glass"><span className="eyebrow"><span className="tiny-line"/>МОИ ЗАДАЧИ</span><div className="task-grid">{tasks.map(({title,Icon})=><article key={title}><span className="task-icon"><Icon size={23} strokeWidth={1.65}/></span><h3>{title}</h3></article>)}</div></div></div></section>}
