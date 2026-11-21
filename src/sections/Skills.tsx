import { useEffect, useState } from 'react';
import { ArrowUpRight, BriefcaseBusiness, Check } from 'lucide-react';
import { TechnologyMark } from '../components/TechnologyMark';
import { capabilities, technologyContexts } from '../content/capabilities';
import { skillGroups } from '../content/skills';

export function Skills() {
  const [groupId, setGroupId] = useState('analytics');
  const [selected, setSelected] = useState('Excel');
  const group = skillGroups.find((item) => item.id === groupId)!;
  const technology = group.items.find((item) => item.name === selected) || group.items[0];
  const capability = capabilities[groupId];
  const context = technologyContexts[technology.name] || capability.proof;

  useEffect(() => {
    setSelected(group.items[0].name);
  }, [group]);

  return (
    <section id="skills" className="capability-workspace" aria-labelledby="skills-title">
      <div className="wrap">
        <header className="capability-heading">
          <span className="eyebrow" id="skills-title">
            <span className="tiny-line" />
            НАВЫКИ И ТЕХНОЛОГИИ
          </span>
        </header>

        <div className="capability-shell glass">
          <nav className="capability-categories" aria-label="Направления навыков">
            {skillGroups.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={groupId === item.id}
                onClick={() => setGroupId(item.id)}
              >
                {item.title}
                <span>{item.items.length}</span>
              </button>
            ))}
          </nav>

          <div className="capability-content">
            <article className="capability-summary">
              <span className="eyebrow">{group.title}</span>
              <h2>{capability.title}</h2>
              <p>{capability.description}</p>
              <ul>
                {capability.tasks.map((task) => (
                  <li key={task}>
                    <Check size={15} />
                    {task}
                  </li>
                ))}
              </ul>
              <p className="capability-proof">
                <BriefcaseBusiness size={15} />
                <span>
                  <strong>Подтверждено опытом</strong>
                  {capability.proof}
                </span>
              </p>
            </article>

            <div className="capability-tools">
              <span className="tools-label">ЧЕМ РЕШАЮ ЗАДАЧИ</span>
              <div className="tool-grid">
                {group.items.map((item) => (
                  <button
                    className={technology.name === item.name ? 'tool-button selected' : 'tool-button'}
                    key={item.name}
                    type="button"
                    aria-pressed={technology.name === item.name}
                    onClick={() => setSelected(item.name)}
                  >
                    <TechnologyMark technology={item} />
                    <span>{item.name}</span>
                    <ArrowUpRight size={13} />
                  </button>
                ))}
              </div>

              <div className="tool-detail glass" aria-live="polite">
                <TechnologyMark technology={technology} />
                <div className="tool-detail-copy">
                  <span className="tool-detail-kicker">КАК ПРИМЕНЯЮ</span>
                  <h3>{technology.name}</h3>
                  <p>{technology.description}</p>
                  <small>
                    <BriefcaseBusiness size={13} />
                    <span>
                      <strong>Контекст применения</strong>
                      {context}
                    </span>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="capability-bottom">
          <p>Выберите направление и инструмент, чтобы увидеть реальные рабочие задачи.</p>
          <a href="#projects">
            Посмотреть реальные проекты
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
