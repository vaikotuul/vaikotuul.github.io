import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Tagasi from '../components/Tagasi'
import './Automatiseerimine.css'
import ToiminguLisamine from '../components/ToiminguLisamine'

interface Action {
  id: number;
  time: string;
  room: string;
  device: string;
}

// Helper functions for localStorage
const saveActionsToStorage = (actions: Action[]) => {
  try {
    localStorage.setItem('automatiseerimiseToimingud', JSON.stringify(actions));
    console.log('Saved actions to localStorage:', actions);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const loadActionsFromStorage = (): Action[] => {
  try {
    const savedActions = localStorage.getItem('automatiseerimiseToimingud');
    if (savedActions) {
      const parsedActions = JSON.parse(savedActions) as Action[];
      console.log('Loaded actions from localStorage:', parsedActions);
      return parsedActions;
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    localStorage.removeItem('automatiseerimiseToimingud');
  }
  return [];
};

function AjapõhineAutomatiseerimine() {
  const [showAddAction, setShowAddAction] = useState(false);
  const [actions, setActions] = useState<Action[]>([]);
  const [isRemoveMode, setIsRemoveMode] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Load actions from localStorage on component mount - once only
  useEffect(() => {
    if (!initialized) {
      const storedActions = loadActionsFromStorage();
      setActions(storedActions);
      setInitialized(true);
      console.log('Initial load completed, initialized set to true');
    }
  }, [initialized]);

  // Save actions to localStorage whenever they change - after initial load
  useEffect(() => {
    if (initialized) {
      saveActionsToStorage(actions);
      console.log('Actions changed, saving to localStorage. Current actions:', actions);
    }
  }, [actions, initialized]);

  const handleAddAction = (newAction: { time: string; room: string; device: string }) => {
    console.log('Adding new action:', newAction);
    const newActionWithId = { id: Date.now(), ...newAction };
    const updatedActions = [...actions, newActionWithId];
    setActions(updatedActions);
    setShowAddAction(false);
  };

  const handleRemoveAction = (id: number) => {
    console.log('Removing action with id:', id);
    const updatedActions = actions.filter(action => action.id !== id);
    setActions(updatedActions);
    
    // If there are no more actions, exit remove mode
    if (updatedActions.length === 0) {
      setIsRemoveMode(false);
    }
  };

  const toggleRemoveMode = () => {
    setIsRemoveMode(!isRemoveMode);
  };

  // Testing localStorage directly from component
  const testLocalStorage = () => {
    try {
      const testKey = '_test_storage_';
      localStorage.setItem(testKey, 'test');
      const testValue = localStorage.getItem(testKey);
      localStorage.removeItem(testKey);
      
      if (testValue === 'test') {
        console.log('localStorage test successful');
        return true;
      } else {
        console.error('localStorage test failed: values don\'t match');
        return false;
      }
    } catch (error) {
      console.error('localStorage test failed with error:', error);
      return false;
    }
  };

  // Run local storage test on mount
  useEffect(() => {
    testLocalStorage();
  }, []);

  return (
    <>
      <Tagasi/>
      <div className="container">
        {!showAddAction ? (
          <>
            <header>
              <h1>Ajapõhine automatiseerimine</h1>
            </header>

            <div className="actions-container wide-container">
              <h2>Seadistatud toimingud</h2>
              
              {actions.length > 0 ? (
                <table className="actions-table">
                  <colgroup>
                    <col style={{ width: '40%' }} />
                    <col style={{ width: '25%' }} />
                    <col style={{ width: '25%' }} />
                    <col style={{ width: '40px' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>Toimumisaeg</th>
                      <th>Ruum</th>
                      <th>Seade</th>
                      <th className="remove-column"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {actions.map((action) => (
                      <tr key={action.id}>
                        <td>{action.time}</td>
                        <td>{action.room}</td>
                        <td>{action.device}</td>
                        <td className="remove-action-cell">
                          <button 
                            className={`remove-action-icon ${isRemoveMode ? '' : 'hidden'}`}
                            onClick={() => handleRemoveAction(action.id)}
                            aria-label="Eemalda toiming"
                            tabIndex={isRemoveMode ? 0 : -1}
                          >
                            &#8722;
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="no-actions">Pole ühtegi seadistatud toimingut. Vajuta "Lisa toiming" nupule uue toimingu lisamiseks.</p>
              )}

              <div className="button-container">
                {actions.length > 0 && (
                  <button 
                    className={isRemoveMode ? "remove-mode-active" : "remove-action-button"} 
                    onClick={toggleRemoveMode}
                  >
                    {isRemoveMode ? "Lõpeta eemaldamine" : "Eemalda toiming"}
                  </button>
                )}
                <button 
                  className="add-action-button" 
                  onClick={() => setShowAddAction(true)}
                >
                  Lisa toiming
                </button>
              </div>
            </div>
          </>
        ) : (
          <ToiminguLisamine onSave={handleAddAction} onCancel={() => setShowAddAction(false)} />
        )}
      </div>
    </>
  )
}

export default AjapõhineAutomatiseerimine